<template>
    <div id="container">
        <div class="heading">
            <h1 class="text-light">Login Pemilu KW 2023</h1>
            <h4 class="text-light">Kelompok 9</h4>
        </div>
        <br />
        <form @submit.prevent="verification">
            <input id="name" type="text" class="form-control" placeholder="NIK (16 Angka)" :minlength="16" v-model="form.nik" :style="(form.nik.length < 16) ? {borderColor : 'red'} : ' '" required>
            <p v-if="form.nik.length < 16" style="color:red">NIK Minimal harus 16 Digit!</p>
            <br />
            <button type="submit" class="btn btn-primary" v-if="form.nik.length >= 16">Login</button>
        </form>
    </div>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous" />
</template>

<style>
.heading {
  text-align: center;
}
</style>

<script>

import router from "../router"
import axios from "axios"
import cookies from 'vue-cookies'

if(cookies.isKey('nik')) cookies.remove('nik')

export default {
    data() {
        return {
            form : {
                nik : "",
                voted : false
            }
        };
    },
    methods : {
        async add() {
            const input = {
                nik : this.form.nik,
                voted : this.form.voted
            };
            axios.post("http://localhost:3000/people/", input)
            .then((res) => {
                cookies.set('nik', input.nik);
                console.log(res);
                router.push('/pemilihan');
            })
            .catch((err) => {
                console.log(err);
            });
            return
        },
        async verification() {
            let inputAddr = 'http://localhost:3000/people/?nik=' + this.form.nik;
            try {
                let res = await axios.get(inputAddr);
                let tmp = res.data;
                if(tmp.length <= 0) this.add();
                else {
                    if(tmp[0].voted === true) {
                        alert('Anda sudah Voting!!!');
                        this.form.nik = "";
                        router.push('/');
                        return
                    }
                    cookies.set('nik', this.form.nik);
                    console.log(res);
                    router.push('/pemilihan');
                }
            }
            catch(error) {
                console.log(error);
            }
        }
    }
}

</script>