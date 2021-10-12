<template>
  <div class="row">
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                  aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/initial" style="margin: 0 10px">首页</a>
          <a class="navbar-brand" href="#">已收藏</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <form class="navbar-form navbar-right" v-if="global.uno === ''">
            <div class="form-group">
              <input type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group">
              <input type="password" placeholder="Password" class="form-control">
            </div>
            <button type="submit" class="btn btn-success">Sign in</button>
          </form>
          <form class="navbar-form navbar-right" v-else style="margin: 0">
            <a class="navbar-brand">Hello, {{ global.uname }}!</a>
          </form>
        </div><!--/.navbar-collapse -->
      </div>
    </nav>

    <div class="jumbotron">
      <div class="container">
        <h1>Music World</h1>
        <p>这是你收藏的音乐</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">点击开始音乐之旅 &raquo;</a></p>
      </div>
    </div>

    <div class="col-md-12">
      <table class="table table-hover table-striped ">
        <thead>
        <tr>
          <th></th>
          <th>序号</th>
          <th>歌名</th>
          <th>歌手</th>
          <th>发行时间</th>
          <th>专辑</th>
          <th>流派</th>
          <!--<th>操作</th>-->
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
        <tr v-for="(item,i) in ly_list" :key="item.id">
          <td>
            <button class="btn" title="收藏" @click="record(item)">
              <i class="glyphicon glyphicon-star" title="点击取消收藏" v-if="item.is_fav === true"></i>
              <i class="glyphicon glyphicon-star-empty" title="点击收藏" v-else></i>
            </button>
          </td>
          <td>{{ i + 1 }}</td>
          <td>{{ item.sname }}</td>
          <td>{{ item.sartist }}</td>
          <td>{{ item.syear }}</td>
          <td>{{ item.salbum }}</td>
          <td>{{ item.sgenre }}</td>
          <!--<td>
            <button class="btn btn-success" title="编辑" @click="editMusic(item)" style="margin:0 10px">
              <i class="glyphicon glyphicon-pencil" title="编辑"></i>
            </button>
            <button class="btn btn-danger" title="删除" @click="deleteMusic2(item)">
              <i class="glyphicon glyphicon-trash" title="删除"></i>
            </button>
          </td>-->
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "record",
  data() {
    return {
      base_url: "",
      ly_list: [],
      music: {sno: '', sname: '', sartist: '', syear: '', salbum: '', sgenre: '',is_fav:false},
      music_blank: {sno: '', sname: '', sartist: '', syear: '', salbum: '', sgenre: '',is_fav:false},
    }
  },
  methods: {
    getMusic() {
      var params = new URLSearchParams();
      params.append('uno', this.global.uno);
      this.$axios({
        method: 'post',
        url: this.base_url,
        data: params
      }).then((res) => {
        this.ly_list = res.data;
        console.log("post success")
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style scoped>

</style>