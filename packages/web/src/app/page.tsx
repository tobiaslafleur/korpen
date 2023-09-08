import useServerSession from '~/lib/sessions';

const Home = async () => {
  const session = await useServerSession();

  return <div>Hello {session?.first_name}</div>;
};

export default Home;
