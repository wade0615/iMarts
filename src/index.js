console.log('I am inside');

Vue.component('scan', {
    data() {
        return{
            decodedContent: '',
            errorMessage: ''
        }
    },
    template: 
        `<section>
            <p>掃描後點擊前往: <b><a :href="decodedContent">{{ decodedContent }}</a></b></p>
            <p class="error">{{ errorMessage }}</p>
            <qrcode-stream @decode="onDecode" @init="onInit" class="view_md"></qrcode-stream>
        </section>`,
    methods: {
        onDecode(content) {
        this.decodedContent = content;
        window.location.href = this.decodedContent;
        },
        onInit(promise) {
            promise.then(() => {
                console.log('Successfully initilized! Ready for scanning now!')
                })
            .catch(error => {
                if (error.name === 'NotAllowedError') {
                    this.errorMessage = 'Hey! I need access to your camera'
                } else if (error.name === 'NotFoundError') {
                    this.errorMessage = 'Do you even have a camera on your device?'
                } else if (error.name === 'NotSupportedError') {
                    this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
                } else if (error.name === 'NotReadableError') {
                    this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
                } else if (error.name === 'OverconstrainedError') {
                    this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
                } else {
                    this.errorMessage = 'UNKNOWN ERROR: ' + error.message
                }
                })
            }
        }
})

new Vue({
    el: '#imarts',

    data: {
        title: 'iMarts 愛碼市',
        copyright: '2020 iMarts/Wade. All Rights Reserved.'
    },

    methods: {
        }
});
Vue.config.devtools = true;