<template>
    <div>
        <tr v-for="candidate in candidates" :key="candidate.id">
            <td>{{ candidate.nama }}</td>
        </tr>
    </div>
</template>
<script>
/* Ambil data json dengan axios*/
import axios from "axios";
export default {
    data() {
        return {
            candidates: [],
        };
    },
    mounted() {
        this.load();
    },
    methods: {
        load() {
            axios
            .get("http://localhost:3000/candidates")
            .then((res) => {
                this.candidates = res.data; //respon dari rest api dimasukan ke users
            })
            .catch((err) => {
                console.log(err);
            });
        },
    },
};
</script>    