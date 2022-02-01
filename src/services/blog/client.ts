import client from "@sanity/client";

export default client({
  projectId: "0rvnwfzg",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-10"
});
