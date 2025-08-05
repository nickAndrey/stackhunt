type PageProps = {
  data: unknown;
};

export function ProfilePage({ data }: PageProps) {
  return <div>{JSON.stringify(data)}</div>;
}
