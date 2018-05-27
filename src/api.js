import Auth from "./Auth";

const api = {
  article: {
    all() {
      return fetch(`/articles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Auth.getToken()}`,
          token: Auth.getToken()
        }
      }).then(response => response.json());
    },
    bySlug(slug) {
      return fetch(`/articles/slug/${slug}.json`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Auth.getToken()}`,
          token: Auth.getToken()
        }
      }).then(response => response.json());
    },
    create(article) {
      return fetch("/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Auth.getToken()}`,
          token: Auth.getToken()
        },
        body: JSON.stringify({
          article
        })
      }).then(response => response.json());
    },
    update(article) {
      return fetch(`/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Auth.getToken()}`,
          token: Auth.getToken()
        },
        body: JSON.stringify({
          article
        })
      }).then(response => response.json());
    }
  }
};

export default api;
