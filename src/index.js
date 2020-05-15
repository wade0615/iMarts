console.log('I am inside');

Vue.component('scan', {
    data() {
        return{
            decodedContent: '',
            errorMessage: '',
            errorState: {
                NotAllowedError() {
                    return 'Hey! I need access to your camera'
                },
                NotFoundError() {
                    return 'Do you even have a camera on your device?'
                },
                NotSupportedError() {
                    return 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
                },
                NotReadableError() {
                    return 'Couldn\'t access your camera. Is it already in use?'
                },
                OverconstrainedError() {
                    return 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
                },
            }
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
        // window.location.target="_blank";
        window.location.href = this.decodedContent;
        // window.open(this.decodedContent, "_blank");
        },
        onInit(promise) {
            promise.then(() => {
                console.log('Successfully initilized! Ready for scanning now!')
                })
            .catch(error => {
                if (error.name in this.errorState) {
                    this.errorMessage = this.errorState[error.name]();
                } else {
                    this.errorMessage = 'UNKNOWN ERROR: ' + error.message
                };
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