<template>
    <div class="editor">
      <textarea :id="id"
                placeHolder="this is placeHolder"></textarea>
    </div>
</template>

<script>
  import $ from 'jquery'
  import Simditor from 'simditor'

  export default {
    name: "editor",
    data() {
      return {
        editor: '',
        options:{
          toolbarFloat: false,
          toolbar: [ 'bold', 'italic', 'underline', 'strikethrough', 'ol', 'ul', 'blockquote', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment' ],
          pasteImage:false,
          imageButton: 'upload',
          defaultImage:'https://static.iqycamp.com/images/imgLoading.png?imageslim',
          upload:{
            url : `/file/image/upload/2`, //文件上传的接口地址
            params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
            fileKey: 'file', //服务器端获取文件数据的参数名
            connectionCount: 3,
            leaveConfirm: '正在上传文件'
          }
        }
      }
    },
    props: ["id"],
    created(){

    },
    mounted() {
      let self = this
      this.editor = new Simditor(Object.assign({}, {
        textarea: $(`#${self.id}`)
      }, this.options))
      this.editor.on('valuechanged', (e, src) => {
        this.valueChange(e, src)
      })
    },
    methods: {
      valueChange(e, val) {
        this.$emit('change', this.editor.getValue())
      }
    }
  }
</script>

<style lang="less">
  @import "./editor.less";
</style>
