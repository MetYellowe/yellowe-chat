<template>
    <v-app app style="background:yellow">
        <v-main>
            <v-container fluid>
                <Navbar/>
                <nuxt/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '../components/Navbar'
export default {
    components: {
        Navbar
    }
}
</script>