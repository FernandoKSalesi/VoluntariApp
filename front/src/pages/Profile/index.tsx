import { useState, useEffect } from "react";
import { User, Mail, Phone, CreditCard, Edit2, Save } from "lucide-react";

import {
  Container,
  Content,
  Card,
  TitleRow,
  Row,
  SideCard
} from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    username: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await api.get("/users/me");
        const { name, email, phone, cpf, username } = response.data;
        setForm({
          name: name || "",
          email: email || "",
          phone: phone || "",
          cpf: cpf || "" ,
          username: username || "",
        });
      } catch (err) {
        console.error("Error loading profile", err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    try {
      await api.put("/users", form);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Error updating profile.");
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <p>Loading...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />

      <Container>
        <h1>My Profile</h1>

        <Content>
          {/* LEFT */}
          <div style={{ flex: 1 }}>
            <Card>
              <TitleRow>
                <h2>Personal Information</h2>

                <span 
                  onClick={() => editing ? handleSave() : setEditing(true)} 
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                  {editing ? (
                    <>
                      <Save size={18} /> Save
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} /> Edit
                    </>
                  )}
                </span>
              </TitleRow>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  disabled={!editing}
                  onChange={handleChange}
                  icon={User}
                />

                <Input
                  label="Email"
                  name="email"
                  value={form.email}
                  disabled={!editing}
                  onChange={handleChange}
                  icon={Mail}
                />

                <Row>
                  <Input
                    label="Phone"
                    name="phone"
                    value={form.phone}
                    disabled={!editing}
                    onChange={handleChange}
                    icon={Phone}
                  />

                  <Input
                    label="CPF"
                    name="cpf"
                    value={form.cpf}
                    disabled={!editing}
                    onChange={handleChange}
                    icon={CreditCard}
                  />
                </Row>
              </div>
            </Card>

            <Card>
              <h2>My Events</h2>
              <p style={{ color: "#777", marginTop: "10px" }}>
                You haven't participated in any events yet.
              </p>
            </Card>
          </div>

          {/* RIGHT */}
          <SideCard>
            <div className="avatar">
              <User size={40} />
            </div>

            <h3>{form.name}</h3>
            <span>@{form.username}</span>

            <div className="stats">
              <div>
                <span>Events participated</span>
                <strong>0</strong>
              </div>

              <div>
                <span>Volunteered hours</span>
                <strong>0h</strong>
              </div>

              <div>
                <span>Impact generated</span>
                <strong>Low</strong>
              </div>
            </div>
          </SideCard>
        </Content>
      </Container>
    </>
  );
}
