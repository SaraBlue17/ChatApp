import useSWR from "swr";

export function useBot() {
  const { data, error, isLoading } = useSWR(
    "https://mocki.io/v1/731f2d9d-6a2a-4f9a-adf6-2f01de012cee"
  );

  return { data };
}
