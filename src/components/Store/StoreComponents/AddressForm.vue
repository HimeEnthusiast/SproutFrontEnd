<template>
  <div id="root">
    <div id="address-container">
      <fieldset id="address-form">
        <span class="input-title">Address: </span>
        <input
          type="text"
          id="address1"
          v-model="address1"
          minlength="1"
          maxlength="150"
          required
        />

        <span class="input-title">Apartment/Unit/Other: </span>
        <input type="text" id="address2" v-model="address2" maxlength="150" />

        <span class="input-title">City: </span>
        <input
          type="text"
          id="city"
          v-model="city"
          minlength="1"
          maxlength="50"
          required
        />

        <span class="input-title">Province: </span>
        <select id="province" v-model="province" required>
          <option v-for="province in provinces" :key="province">
            {{ province }}
          </option>
        </select>

        <span class="input-title">Postal Code: </span>
        <input
          type="text"
          v-model="postalcode"
          minlength="6"
          maxlength="7"
          pattern="([ABCEGHJKLMNPRSTVXY][0-9][A-Z][ ]*[0-9][A-Z][0-9])"
          required
        />

        <span id="save-check-container" v-if="jwtExists()">
          <!-- v-if logged in -->
          <input id="save-check" type="checkbox" v-model="saveAddress" /> Save
          this address?
        </span>
      </fieldset>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Quicksand|Raleway&display=swap");

#root {
  font-family: "Quicksand", sans-serif;
  margin: 1%;
}

#address-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
}

input,
select {
  margin-bottom: 2%;
  margin-top: 1%;
  padding: 2%;
  width: 40vh;
  border-radius: 5px;
  font-family: "Raleway", sans-serif;
  border: 1px solid rgb(206, 206, 206);
}

#save-check {
  width: 20px;
}

.input-title {
  margin: 3% 0 0 0;
}
</style>

<script>
export default {
  name: "AddressForm",
  data() {
    return {
      address1: "",
      address2: "",
      city: "",
      province: "",
      provinces: [
        "ON",
        "QC",
        "NS",
        "NB",
        "MB",
        "BC",
        "PE",
        "SK",
        "AB",
        "NL",
        "NT",
        "YT",
        "NU"
      ],
      postalcode: "",
      saveAddress: false
    };
  },
  watch: {
    address1: function() {
      this.$emit("address1", this.address1);
    },
    address2: function() {
      this.$emit("address2", this.address2);
    },
    city: function() {
      this.$emit("city", this.city);
    },
    province: function() {
      this.$emit("province", this.province);
    },
    postalcode: function() {
      this.$emit("postalcode", this.postalcode);
    },
    saveAddress: function() {
      this.$emit("saveAddress", this.saveAddress);
    }
  },
  methods: {
    jwtExists: function() {
      let jwt = false;

      if (this.$cookies.get("jwt")) {
        jwt = true;
      }

      return jwt;
    }
  }
};
</script>
