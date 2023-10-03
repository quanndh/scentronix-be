import axios from "axios";
import servers from "../servers.json";

export const ServerController = {
  findServer: async function () {
    return new Promise(async (res, rej) => {
      const resultMap: Record<string, string> = {};

      await Promise.all(
        servers.map(async (server) => {
          try {
            const res = await axios(server.url, { timeout: 5000 });
            if (res.status >= 200 && res.status <= 299) {
              resultMap[server.priority] = server.url;
            }
          } catch (error) {}
        })
      );

      const onlineServers = Object.values(resultMap);
      if (!onlineServers.length) rej("no server available");

      res(onlineServers[0]);
    });
  },
};
