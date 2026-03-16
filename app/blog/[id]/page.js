
export default async function Page({ params }) {
  const { id } = await params;

  return (
    <h1 style={{ fontWeight: 700, fontFamily: "cursive", textAlign: "center" }}>
      Single Blog Page: {id}
    </h1>
  );
} 