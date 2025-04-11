import useSWR from 'swr';

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR('/api/v1/status', fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return <div>Última atualização: {new Date(data.update_at).toLocaleString('pt-BR')}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR('/api/v1/status', fetchApi, {
    refreshInterval: 2000,
  });

  if (isLoading && !data) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <h2>Database</h2>
      <div>Versão: {data.dependencies.database.version}</div>
      <div>Conexões abertas: {data.dependencies.database.opened_connections}</div>
      <div>Máximo de conexões: {data.dependencies.database.max_connections}</div>
    </>
  );
}
