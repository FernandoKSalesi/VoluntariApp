import 'dotenv/config';
import { prisma } from '../src/data/prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  // Criar voluntários
  const voluntarios = [];
  for (let i = 1; i <= 5; i++) {
    const vol = await prisma.user.upsert({
      where: { email: `voluntario${i}@teste.com` },
      update: {},
      create: {
        name: `Voluntário ${i}`,
        email: `voluntario${i}@teste.com`,
        username: `voluntario${i}`,
        passwordHash,
        cpf: `0000000000${i}`,
        phone: `1188888888${i}`,
      },
    });
    voluntarios.push(vol);
  }

  // Garantir que existe a categoria
  const cat = await prisma.category.upsert({
    where: { name: 'Meio Ambiente' },
    update: {},
    create: { name: 'Meio Ambiente' },
  });

  // Identificar o primeiro usuário como organizador
  const user = await prisma.user.findFirst();
  if (!user) return console.log('Crie uma conta primeiro para o seed funcionar associando a vc!');

  // Criar eventos
  const e1 = await prisma.event.create({
    data: {
      name: 'Limpeza do Parque Central ' + Math.random().toString(36).substring(7),
      description: 'Vamos nos reunir para limpar o principal parque da cidade.',
      startTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 26),
      location: 'Parque Central',
      totalSpots: 10,
      organizerId: user.id,
      categories: {
        create: [{ categoryId: cat.id }]
      }
    }
  });

  const e2 = await prisma.event.create({
    data: {
      name: 'Plantio de Árvores Nativas ' + Math.random().toString(36).substring(7),
      description: 'Ação para reflorestar a área leste da cidade.',
      startTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 48),
      endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 52),
      location: 'Zona Leste',
      totalSpots: 20,
      organizerId: user.id,
      categories: {
        create: [{ categoryId: cat.id }]
      }
    }
  });

  // Inscrever os voluntários nos eventos
  for (let i = 0; i < 3; i++) {
    await prisma.subscription.create({
      data: {
        userId: voluntarios[i].id,
        eventId: e1.id,
        status: 'CONFIRMED'
      }
    });
  }

  for (let i = 2; i < 5; i++) {
    await prisma.subscription.create({
      data: {
        userId: voluntarios[i].id,
        eventId: e2.id,
        status: 'CONFIRMED'
      }
    });
  }

  // Inscreve vc mesmo em um dos eventos para constar no perfil
  try {
    await prisma.subscription.create({
      data: {
        userId: user.id,
        eventId: e1.id,
        status: 'CONFIRMED'
      }
    });
  } catch (e) {
    // Already subscribed
  }

  // Criar avaliações para o evento 1
  await prisma.eventRating.createMany({
    data: [
      { eventId: e1.id, userId: voluntarios[0].id, rating: 5, comment: 'Evento sensacional, muito bem organizado!' },
      { eventId: e1.id, userId: voluntarios[1].id, rating: 4, comment: 'Gostei bastante, mas faltou equipamento.' },
      { eventId: e1.id, userId: voluntarios[2].id, rating: 5, comment: 'Foi ótimo ajudar a comunidade.' }
    ]
  });

  // Criar avaliações para o evento 2
  await prisma.eventRating.createMany({
    data: [
      { eventId: e2.id, userId: voluntarios[3].id, rating: 5, comment: 'Muito bom, excelente iniciativa.' },
      { eventId: e2.id, userId: voluntarios[4].id, rating: 3, comment: 'Foi legal, mas o local era muito longe.' }
    ]
  });

  console.log('Seed realizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
