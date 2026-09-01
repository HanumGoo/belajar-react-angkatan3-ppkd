import { useState } from "react";

function FormSiswa({ tambahSiswa }) {
  const [name, setName] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [usia, setUsia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !usia) {
      alert("nama atau usia tidak boleh kosong");
      return;
    }
    tambahSiswa({
      id: Date.now(),
      name: name.trim(),
      usia: usia,
      jurusan: jurusan,
    });
    setName("");
    setUsia("");
    setJurusan("");
  };

  return (
    <form action="" className="form-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Nama Lengkap</label>
        <input type="text" name="" id="name" placeholder="Nama Lengkap" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="">Usia</label>
        <input type="text" name="" id="usia" placeholder="Usia Anda" value={usia} onChange={(e) => setUsia(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="">Jurusan</label>
        <input type="text" name="" id="usia" placeholder="Jurusan Anda" value={jurusan} onChange={(e) => setJurusan(e.target.value)} />
      </div>
      <button type="submit" className="btn-submit">
        Simpan
      </button>
    </form>
  );
}

export default FormSiswa;
