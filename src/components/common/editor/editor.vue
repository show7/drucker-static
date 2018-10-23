<template>
    <div class="editor">
      <textarea :id="id"
                placeHolder="this is placeHolder"></textarea>
    </div>
</template>

<script>
import $ from 'jquery'
import Simditor from './simditor'

export default {
  name: 'editor',
  data () {
    return {
      editor: '',
      options: {
        toolbarFloat: false,
        toolbar: this.toolbar ? this.toolbar : [ 'bold', 'italic', 'underline', 'strikethrough', 'ol', 'ul', 'blockquote', 'link', 'image', 'hr', 'indent', 'outdent', 'alignment' ],
        pasteImage: false,
        imageButton: 'upload',
        defaultImage: 'https://static.iqycamp.com/images/imgLoading.png?imageslim',
        upload: {
          url: `/file/image/upload/2`, //文件上传的接口地址
          params: null, //键值对,指定文件上传接口的额外参数,上传的时候随文件一起提交
          fileKey: 'file', //服务器端获取文件数据的参数名
          connectionCount: 3,
          leaveConfirm: '正在上传文件'
        }
      }
    }
  },
  props: ['id', 'value', 'toolbar'],
  created () {

  },
  mounted () {
    let self = this
    this.editor = new Simditor(Object.assign({}, {
      textarea: $(`#${self.id}`)
    }, this.options))
    this.editor.on('valuechanged', (e, src) => {
      this.valueChange(e, src)
    })
    this.editor.on('pasting', (e, $content) => {
      console.log('$content',$content)
      // 图片处理
      let images = $content.find('img')
      images.each((key, item) => {
        let $img = $(item)
        if(/^data:image/.test($img.attr('src'))) {
          // 读取图片数据
          var blob = this.dataURLtoBlob($img.attr('src'))
          // 显示默认图
          $img.attr('src', 'https://static.iqycamp.com/images/imgLoading.png?imageslim')
          // 定义FormData
          let data = new FormData()
          data.append('file', blob)
          // 上传
          $.ajax({
            url: '/file/image/upload/2',
            type: 'post',
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,
            cache: false
          }).then(function(res) {
            if(res.code === 200) {
              // 上传成功
              $img.attr('src', res.msg.picUrl)
            }
          }, function(error) {
            console.error(error)
          })
        }
      })

      // style处理
      $content.find('*').each((key, item) => {
        let $p = $(item)
        if(!$p.is('img')) {
          $p.removeAttr('style')
        }
      })

      $content.each((key, item) => {
        let $p = $(item)
        if(!$p.is('img')) {
          $p.removeAttr('style')
        }
      })
    })
    if(this.value){
      this.editor.setValue(this.value)
    }
  },
  methods: {
    valueChange (e, val) {
      this.$emit('change', this.editor.getValue())
    },
    dataURLtoBlob(dataURL) {
      var BlobBuilder, arrayBuffer, bb, blobArray, byteString, hasArrayBufferViewSupport, hasBlobConstructor, i, intArray,
        k, mimeString, ref, supportBlob
      hasBlobConstructor = window.Blob && (function() {
        var e
        try {
          return Boolean(new Blob())
        } catch(_error) {
          e = _error
          return false
        }
      })()
      hasArrayBufferViewSupport = hasBlobConstructor && window.Uint8Array && (function() {
        var e
        try {
          return new Blob([ new Uint8Array(100) ]).size === 100
        } catch(_error) {
          e = _error
          return false
        }
      })()
      BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
      supportBlob = hasBlobConstructor || BlobBuilder
      if(!(supportBlob && window.atob && window.ArrayBuffer && window.Uint8Array)) {
        return false
      }
      if(dataURL.split(',')[ 0 ].indexOf('base64') >= 0) {
        byteString = atob(dataURL.split(',')[ 1 ])
      } else {
        byteString = decodeURIComponent(dataURL.split(',')[ 1 ])
      }
      arrayBuffer = new ArrayBuffer(byteString.length)
      intArray = new Uint8Array(arrayBuffer)
      for(i = k = 0, ref = byteString.length; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
        intArray[ i ] = byteString.charCodeAt(i)
      }
      mimeString = dataURL.split(',')[ 0 ].split(':')[ 1 ].split(';')[ 0 ]
      if(hasBlobConstructor) {
        blobArray = hasArrayBufferViewSupport ? intArray : arrayBuffer
        return new Blob([ blobArray ], {
          type: mimeString
        })
      }
      bb = new BlobBuilder()
      bb.append(arrayBuffer)
      return bb.getBlob(mimeString)
    }
  }
}
</script>

<style lang="less">
  @import "./editor.less";
</style>
