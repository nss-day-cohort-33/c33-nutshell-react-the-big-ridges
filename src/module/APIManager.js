const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: function (resource, id) {
            return fetch(`${remoteURL}/${resource}/${id}`).then(data => data.json())
        }
    },
    getAll: {
        value: function (resource) {
            return fetch(`${remoteURL}/${resource}`).then(data => data.json())
        }
    },

    delete: {
        value: function (resource, id) {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "DELETE"
            }).then(e => e.json())
        }
    },

    post: {
        value: function (newObject, resource) {
            return fetch(`${remoteURL}/${resource}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
              }).then(data => data.json())
        }
    },

    put: {
       value: function (editedObject, resource) {
        return fetch(`${remoteURL}/${resource}/${editedObject.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedObject)
        }).then(data => data.json());
      }
    }
})
