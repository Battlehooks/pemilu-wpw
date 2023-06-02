<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm">
                <h1 class="text-light">Class P4PUNTEN</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-sm" v-for="candidate in candidates" :key="candidate.id">
                <div class="card bg-dark">
                    <img class="card-img-top" v-bind:src="candidate.pict" v-bind:alt="candidate.nama">
                    <div class="card-body">
                            <input type="text" v-bind:value="candidate.id" hidden>
                            <p class="card-text text-center text-light">{{ candidate.id }}</p>
                            <p class="card-text text-center text-light">{{ candidate.nama }}</p>
                            <p class="card-text text-center text-light">{{ candidate.asal }}</p>
                            <div class="text-center">
                                <button @click="vote(candidate)" type="submit" class="btn btn-primary">Vote</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div class="card bg-dark" style="width: 18rem;">
        <img class="card-img-top" src="../assets/armstrong-baskara.jpg" alt="Armstrong Baskara">
        <div class="card-body">
            <p class="card-text">1</p>
            <p class="card-text">Armstrong Baskara</p>
            <p class="card-text">Jakarta Utara</p>
        </div>
    </div> -->
</template>
<script>
import router from "../router"
import axios from "axios"
import cookies from "vue-cookies"

if (!cookies.isKey('id')) router.push('/');

export default {
    data() {
        return {
            candidates: {},
            person: {}
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            axios
            .get('http://localhost:3000/candidates')
            .then((res) => {
                this.candidates = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        async vote(candidate) {
            let addrPeople = 'http://localhost:3000/people/?nik=' + cookies.get('nik');
            let addrCandidate = 'http://localhost:3000/candidates/' + candidate.id;
            axios.get(addrPeople).then(res => {
                let tmp = res.data[0];
                this.person = {
                    id: tmp.id,
                    nik: tmp.nik,
                    voted: true
                };
            }).catch(err => {
                console.log(err);
            });

            let addrPerson = 'http://localhost:3000/people/' + this.person.id;
            axios.put(addrPerson, this.person).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })

            axios.put(addrCandidate, {
                nama: candidate.nama,
                id: candidate.id,
                asal: candidate.asal,
                pict: candidate.pict,
                suara: candidate.suara + 1,
            }).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            });

            cookies.remove('id');
            router.push('/');
        },
    },
};
</script>