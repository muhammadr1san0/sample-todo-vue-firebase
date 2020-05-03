<template>
  <div>
    <div>
      <p>Upload an image to Firebase</p>
      <input type="file" accept="image/*" @change="reviewImage">
    </div>
    <div>
      <p>Progress:
        {{uploadValue.toFixed() + "%"}}
        <progress :value="uploadValue" max="100%" >100%</progress>
      </p>
    </div>
    <div>
      <img class="preview" :src="picture">
      <br>
      <button @click="onUpload">Upload</button>
    </div>
  </div>
</template>

<script>
import firebase from '../firebase'

export default {
  name: 'Upload',
  data () {
    return {
      imageData: null,
      picture: null,
      uploadValue: 0
    }
  },
  methods: {
    reviewImage (event) {
      console.log(event)
      this.uploadValue = 0
      this.picture = null
      this.imageData = event.target.files[0]
    },
    onUpload () {
      this.picture = null
      const storageRef = firebase.storage().ref(`images/${this.imageData.name}`).put(this.imageData)
      storageRef.on('state_changed',
        snapshot => {
          console.log(snapshot)
          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => { console.log(error) },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
          })
        }
      )
    }
  }
}
</script>

<style scoped>
img.priview{
  width: 200px;
}
</style>
