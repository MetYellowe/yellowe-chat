<template>
    <v-app app style="background:gold">
        <v-main>
            <v-container fluid>
                <Navbar/>
                <nuxt/>
                <VuetifyGrid2/>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '../components/Navbar'
import VuetifyGrid2 from '../components/VuetifyGrid2'
export default {
    components: {
        Navbar,
        VuetifyGrid2
    }
}
</script>
