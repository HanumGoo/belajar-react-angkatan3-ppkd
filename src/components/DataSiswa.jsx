export function DataSiswa({ name, usia, jurusan, alamat }) {
  return (
    <>
      <h1>{name}</h1>
      <p>
        <strong>Usia</strong>: {usia}
      </p>
      <p>
        <strong>Jurusan</strong>: {jurusan}
      </p>
      <p>
        <strong>Alamat</strong>: {alamat}
      </p>
    </>
  );
}
