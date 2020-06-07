<template>
  <div id="root">
    <h1>Your Info</h1>

    <div id="user-edit">
      <UserField
        title="First Name"
        :field="firstName"
        v-bind:password="false"
        v-bind:email="false"
        @clicked="editUserField($event, '', '', '')"
      ></UserField>
      <UserField
        title="Last Name"
        :field="lastName"
        v-bind:password="false"
        v-bind:email="false"
        @clicked="editUserField('', $event, '', '')"
      ></UserField>
      <UserField
        title="Email"
        :field="email"
        v-bind:password="false"
        v-bind:email="true"
        @clicked="editUserField('', '', $event, '')"
      ></UserField>
      <UserField
        title="Password"
        field="**********"
        v-bind:password="true"
        v-bind:email="false"
        @clicked="editUserField('', '', '', $event)"
      ></UserField>
    </div>
  </div>
</template>

<style scoped>
#root {
  display: flex;
  flex-direction: column;
}
</style>

<script>
import UserField from "./UserField";
import axios from "axios";

export default {
  name: "UserForm",
  components: {
    UserField
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      id: this.$store.getters.getUserId,
      jwt: this.$cookies.get("jwt").replace(/"/g, "")
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    buttonChange() {
      let editButton = this.$refs["edit-btn"];
      let confirmButton = this.$refs["confirm-btn"];
      let cancelButton = this.$refs["cancel-btn"];

      editButton.style.display = "none";
      confirmButton.style.display = "initial";
      cancelButton.style.display = "initial";
    },
    getUserInfo() {
      axios
        .get("http://localhost:8082/user/" + this.id, {
          headers: {
            Authorization: "Bearer " + this.jwt
          }
        })
        .then(response => {
          this.firstName = response.data.firstName;
          this.lastName = response.data.lastName;
          this.email = response.data.username;
        });
    },
    editUserField(fn, ln, un, pw) {
      axios
        .post(
          "http://localhost:8082/edit-user/" + this.id,
          {
            firstName: fn,
            lastName: ln,
            username: un,
            password: pw
          },
          {
            headers: {
              Authorization: "Bearer " + this.jwt
            }
          }
        )
        .then(
          response => {
            console.log(response.data);

            if (response.data.jwt) {
              const jwt = JSON.stringify(response.data.jwt);

              this.$cookies.remove("jwt");
              this.$cookies.set("jwt", jwt, "7d");

              this.$router.push("/user/" + this.id);
            }
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>
