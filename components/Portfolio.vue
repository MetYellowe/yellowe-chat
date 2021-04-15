<template>
    <v-container>
        <v-row style="padding:50px;">
            <div
                :class="bp === 'xs' || bp === 'sm' ? 'text-h6' : bp === 'md' || bp === 'lg' ? 'text-h2' : 'text-h1'"
            >
                Choose a photo in which you are happy or sad or simply mad
            </div>
        </v-row>
        <v-row>
            <v-file-input
                multiple
                label="Add your files"
                @change="onAddFiles"
            />
            <v-card-text
                v-if="changeGo && filesResponse.length < filesLength"
                class="font-weight-bold"
            >
                Please, wait...
            </v-card-text>
        </v-row>
        <v-row v-if="filesResponse.length == filesLength && changeGo">
            <v-btn
                color="success"
                dark
                small
                @click="hiddenForm"
            >
                Go to Portfolio
            </v-btn>
        </v-row>

        <v-alert v-if="isError">
            {{errorText}}
        </v-alert>
            
    </v-container>
</template>

<script>
export default {
    data: () => ({
        filesResponse: [],
        isError: false,
        errorText: null,
        changeGo: false,
        filesLength: "",
        data: {}
    }),
    props: ['hidForm', 'hidBackButton'],
    computed: {
        bp() {
            const { xs, sm, md, lg } = this.$vuetify.breakpoint
            return xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : 'xl'
        }
    },
    methods: {
        async hiddenForm() {
            const { email } = this.$auth.$storage.getUniversal('user')
            const data = await this.$axios.$post(`/server/user-info`, {
                text: this.$store.state.data.userMetaData.info,
                cloudData: this.$store.state.joinImgs,
                email: email
            })
            this.$store.dispatch('setData', data)
            //this.data = data
            this.hidForm({
                imagesDownloaded: false,
                //data: this.data

            })
        },
        /*onAddFiles(files) {
            if(files.length > 0) {
                this.filesLength = files.length
                files.forEach((file) => {
                    this.uploadFileToCloudinary(file, 'POST').then(async (fileResponse) => {
                        console.log(fileResponse)
                        this.filesResponse.push(fileResponse);
                        this.$store.dispatch('setData', this.filesResponse)
                        const { email } = this.$auth.$storage.getUniversal('user')
                        const data = await this.$axios.$post(`/server/user-info`, {
                            text: this.$store.state.data.userMetaData.info,
                            cloudData: this.$store.state.joinImgs,
                            email: email
                        })
                        this.$store.dispatch('setData', data)
                        //this.data = data
                    });
                });
                this.changeGo = true
            }
        },*/
        onAddFiles(files) {
            if(files.length > 0) {
                this.filesLength = files.length
                files.forEach((file) => {
                    this.uploadFileToCloudinary(file, 'POST').then((fileResponse) => {
                        return fileResponse
                    }).then((fileResponse) => {
                        this.filesResponse.push(fileResponse)
                        this.$store.dispatch('setData', this.filesResponse)
                    });
                });
                this.changeGo = true
                this.hidBackButton({
                    buttonRequired: false
                })
            }
        },
        uploadFileToCloudinary(file, method) {
            return new Promise(function (resolve, reject) {
                //Ideally these to lines would be in a .env file
                const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dckio9wiu/upload';
                const CLOUDINARY_UPLOAD_PRESET = 'weyyjayi';

                let formData = new FormData();
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
                formData.append('folder', 'users-chat-app');
                formData.append('file', file);

                let request = new XMLHttpRequest();
                request.open(method, CLOUDINARY_URL, true);
                request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                request.onreadystatechange = () => {
                    // File uploaded successfully
                    if (request.readyState === 4 && request.status === 200) {
                        let response = JSON.parse(request.responseText);
                        resolve(response);
                    }

                    // Not succesfull, let find our what happened
                    if (request.status !== 200) {
                        let response = JSON.parse(request.responseText);
                        let error = response.error.message;
                        this.errorText = 'error uploading files ' + error;
                        this.isError = true;
                        reject(error);
                    }

                };

                request.onerror = (err) => {
                    this.errorText = 'error uploading files ' + error;
                    this.isError = true;
                    reject(err);
                };

                request.send(formData);
            });
        }
    }
}
</script>
