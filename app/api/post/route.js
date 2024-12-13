export async function GET(req) {
  return new Response(JSON.stringify({ posts: [] }), { status: 200 });
}

export async function POST(req) {
  const data = await req.json();
  // Handle saving the post (e.g., to a database)
  return new Response(JSON.stringify({ message: "Post created!" }), {
    status: 201,
  });
}
