import { defineHook } from "@directus/extensions-sdk";
import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("https://rickandmortyapi.com/graphql");

export default defineHook(({ filter, action }) => {
  filter("items.create", async () => {
    client
      .request(
        `
		  query {
			characters(page: 2, filter: { name: "Morty" }) {
			  info {
				count
			  }
			  results {
				name
			  }
			}
		  }
		  `
      )
      .then((data) => console.log(data));

    console.log("Creating Item!");
  });

  action("items.create", () => {
    console.log("Item created!");
  });
});
