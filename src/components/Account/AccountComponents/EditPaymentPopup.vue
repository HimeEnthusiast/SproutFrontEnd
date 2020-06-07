<template>
  <div id="root">
    <div id="popup">
      <h1>{{ action }} Payment Card</h1>
      <div id="editable-lines">
        <h3>Card Bearer:</h3>
        <input
          id="full-name"
          v-model="cardName"
          type="text"
          minlength="1"
          maxlength="50"
          required
        />
        <span class="error" v-if="nameError">Name cannot be empty.</span>

        <h3>Credit Card Number:</h3>
        <input
          id="ccnumber"
          v-model="creditNumber"
          type="number"
          minlength="16"
          maxlength="19"
          required
        />
        <span class="error" v-if="creditFormatError"
          >Credit card must be a 16-19 digit number.</span
        >

        <h3>CVV:</h3>
        <input
          id="cvv"
          v-model="cardCvv"
          type="password"
          minlength="3"
          maxlength="3"
          required
        />
        <span class="error" v-if="cvvFormatError"
          >CVV must be a 3 digit number.</span
        >
      </div>

      <div id="buttons">
        <button
          id="confirm-button"
          ref="confirm-btn"
          @click="edit ? editData() : createData()"
        >
          <svg
            id="confirm-icon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="check"
            class="svg-inline--fa fa-check fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
            ></path>
          </svg>
        </button>

        <button id="cancel-button" ref="cancel-btn" @click="closeWindow()">
          <svg
            id="cancel-icon"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            class="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <div id="background"></div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

.error {
  color: rgb(228, 0, 49);
  font-size: 13px;
}

#popup {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  width: 60vh;
  padding: 25px;
  border-radius: 15px;
  z-index: 1;
  left: 0;
  right: 0;
  top: 25%;
  margin: 0 auto 0 auto;
  box-shadow: 0 5px 5px #0000004a;
}
#background {
  position: absolute;
  background-color: #000000;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  opacity: 50%;
  overflow: hidden;
}

#editable-lines {
  display: flex;
  flex-direction: column;
  margin-bottom: 3%;
}

input,
select {
  margin-bottom: 3%;
  margin-top: 1%;
  padding: 2%;
  width: 40vh;
  border-radius: 5px;
  font-family: "Raleway", sans-serif;
  border: 1px solid rgb(206, 206, 206);
}

h3 {
  margin: 3% 0 0 0;
}

#buttons {
  margin-left: auto;
}

#confirm-button,
#cancel-button {
  width: 50px;
  height: 50px;
  border-radius: 7px;
  border: none;
  background-color: #00a896;
  margin-right: 20px;
  vertical-align: middle;
}

#cancel-button {
  background-color: #b90047;
}

#confirm-icon,
#cancel-icon {
  width: 60%;
  fill: #ffffff;
}

#confirm-button:hover,
#cancel-button:hover {
  cursor: pointer;
  scale: 1.1;
  transition: 0.3s;
}
</style>

<script>
import axios from "axios";

export default {
  name: "EditPaymentPopup",
  props: {
    isEdit: Boolean,
    paymentId: Number,
    cardBearer: String,
    ccNumber: Number
  },
  data() {
    return {
      action: "",
      edit: this.isEdit,
      id: this.paymentId,
      creditNumber: this.ccNumber,
      cardName: this.cardBearer,
      cardCvv: "",
      jwt: this.$cookies.get("jwt").replace(/"/g, ""),
      creditFormatError: false,
      nameError: false,
      cvvFormatError: false
    };
  },
  mounted() {
    if (this.edit == true) {
      this.action = "Edit";
    } else {
      this.action = "Add";
    }
  },
  methods: {
    closeWindow() {
      this.$emit("clicked", "value");
    },
    editData() {
      let creditInput = document.getElementById("ccnumber");
      let nameInput = document.getElementById("full-name");
      let cvvInput = document.getElementById("cvv");

      if (
        creditInput.checkValidity() &&
        nameInput.checkValidity() &&
        cvvInput.checkValidity()
      ) {
        this.creditFormatError = false;
        this.nameError = false;
        this.cvvFormatError = false;

        axios
          .post(
            "http://localhost:8082/edit-user-payment/" + this.id,
            {
              ccNumber: this.creditNumber,
              cardBearer: this.cardName,
              cvv: this.cardCvv
            },
            {
              headers: {
                Authorization: "Bearer " + this.jwt
              }
            }
          )
          .then(response => {
            console.log(response.data);
            this.$emit("done", 1);
          });
      } else {
        if (
          !/\d{16,19}/.test(this.creditNumber) ||
          !creditInput.checkValidity()
        ) {
          this.creditFormatError = true;
        }

        if (!nameInput.checkValidity()) {
          this.nameError = true;
        }

        if (!/\d{3}/.test(this.cardCvv) || !cvvInput.checkValidity()) {
          this.cvvFormatError = true;
        }
      }
    },
    createData() {
      let creditInput = document.getElementById("ccnumber");
      let nameInput = document.getElementById("full-name");
      let cvvInput = document.getElementById("cvv");

      if (
        creditInput.checkValidity() &&
        nameInput.checkValidity() &&
        cvvInput.checkValidity()
      ) {
        axios
          .post(
            "http://localhost:8082/add-user-payment",
            {
              ccNumber: this.creditNumber,
              cardBearer: this.cardName,
              cvv: this.cardCvv
            },
            {
              headers: {
                Authorization: "Bearer " + this.jwt
              }
            }
          )
          .then(response => {
            console.log(response.data);
          });

        this.$emit("done", 1);
      } else {
        if (
          !/\d{16,19}/.test(this.creditNumber) ||
          !creditInput.checkValidity()
        ) {
          this.creditFormatError = true;
        }

        if (!nameInput.checkValidity()) {
          this.nameError = true;
        }

        if (!/\d{3}/.test(this.cardCvv) || !cvvInput.checkValidity()) {
          this.cvvFormatError = true;
        }
      }
    }
  }
};
</script>
