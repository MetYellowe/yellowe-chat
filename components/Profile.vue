<template>
    <v-card
        light
        v-show="showTextarea"
    >
        <v-textarea
            style="
                font:20px sans-serif;
            "
            rows="12"
            v-model="text"
        ></v-textarea>
        <v-btn
            icon
            @click="publishing"    
        >
            <v-icon large>mdi-paperclip</v-icon>
        </v-btn>
    </v-card>
</template>

<script>

export default {
    data() {
        return {
            text: this.editingText,
            showTextarea: true
        }
    },
    props: ['refresh', 'editingText'],
    methods: {
        publishing() {
            this.showTextarea = false
            this.refresh(this.text)
        }
    }
}
</script>