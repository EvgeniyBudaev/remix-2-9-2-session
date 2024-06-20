import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '~/sessions.server';

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;
  const session = await getSession(request.headers.get("Cookie"));
  const numberOfVisits: number = session.get("numberOfVisits") + 1 || 1;
  session.set("numberOfVisits", numberOfVisits);
  const cookie = await commitSession(session);
  return json(
    { numberOfVisits },
    {
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const data = useLoaderData();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}