import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const fetchContacts = async () => {
  const res = await fetch("https://contact-tracker-zy9f.onrender.com/api/list-children/");
  if (!res.ok) throw new Error("Failed to fetch contacts");
  return await res.json();
};

const filterContacts = (contacts, filters) => {
  return contacts.filter((c) => {
    const name = `${c.first_name} ${c.last_name}`.toLowerCase();
    const village = c.village?.toLowerCase() || "";
    const number = c.number || "";
    return (
      (!filters.number || number.includes(filters.number)) &&
      (!filters.village || village.includes(filters.village.toLowerCase())) &&
      (!filters.name || name.includes(filters.name.toLowerCase()))
    );
  });
};

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [filters, setFilters] = useState({ number: "", village: "", name: "" });
  const [filtered, setFiltered] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContact, setEditContact] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchContacts()
      .then(setContacts)
      .catch(() => setContacts([]));
  }, []);

  useEffect(() => {
    setFiltered(filterContacts(contacts, filters));
  }, [contacts, filters]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const startEdit = (id, currentContact) => {
    setEditingId(id);
    setEditContact(currentContact);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContact("");
  };

  const saveEdit = async (id) => {
    setIsSaving(true);
    try {
      const res = await fetch(`https://contact-tracker-zy9f.onrender.com/api/children/${id}/update-contact/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact: editContact }),
      });
      if (!res.ok) throw new Error("Failed to update contact");
      setContacts((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, contact: editContact } : c
        )
      );
      setEditingId(null);
      setEditContact("");
    } catch (err) {
      alert("Failed to update contact.");
    }
    setIsSaving(false);
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Number", "First Name", "Last Name", "Village", "Contact"]],
      body: filtered.map((c) => [
        c.number,
        c.first_name,
        c.last_name,
        c.village,
        c.contact,
      ]),
    });
    doc.save("contacts.pdf");
  };

  return (
    <div>
      <h2>All Contacts</h2>
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        <input
          name="number"
          placeholder="Filter by Number"
          value={filters.number}
          onChange={handleChange}
        />
        <input
          name="village"
          placeholder="Filter by Village"
          value={filters.village}
          onChange={handleChange}
        />
        <input
          name="name"
          placeholder="Filter by Name"
          value={filters.name}
          onChange={handleChange}
        />
        <button onClick={exportExcel}>Export Excel</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Village</th>
            <th>Contact</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>No contacts found.</td>
            </tr>
          ) : (
            filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.number}</td>
                <td>{c.first_name}</td>
                <td>{c.last_name}</td>
                <td>{c.village}</td>
                <td>
                  {editingId === c.id ? (
                    <input
                      value={editContact}
                      onChange={e => setEditContact(e.target.value)}
                      disabled={isSaving}
                    />
                  ) : (
                    c.contact
                  )}
                </td>
                <td>
                  {editingId === c.id ? (
                    <>
                      <button onClick={() => saveEdit(c.id)} disabled={isSaving}>Save</button>
                      <button onClick={cancelEdit} disabled={isSaving}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(c.id, c.contact)}>Edit</button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;