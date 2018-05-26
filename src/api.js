import Auth from "./Auth";

const api = {
  article: {
    bySlug(slug) {
      return fetch(`/articles/slug/${slug}.json`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Auth.getToken()}`,
          token: Auth.getToken()
        }
      }).then(response => response.json());
    }
  }
};

export default api;
