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
          <a class="navbar-brand" href="#" style="margin: 0 10px">首页</a>
          <a class="navbar-brand" href="/record">已收藏</a>
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
    <div>
      <!-- Main jumbotron for a primary marketing message or call to action -->
      <div class="jumbotron">
        <div class="container">
          <h1>Music World</h1>
          <p>畅享你的音乐世界</p>
          <p><a class="btn btn-primary btn-lg" href="#" role="button">点击开始音乐之旅 &raquo;</a></p>
        </div>
      </div>
    </div>
    <div class="alert alert-success alert-dismissible" role="alert" v-if="warningBoxType.type === 1">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeWarningBox()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>恭喜!</strong> 成功添加歌曲 《{{ warningBoxType.sname }}》
    </div>
    <div class="alert alert-success alert-dismissible" role="alert" v-else-if="warningBoxType.type === 2">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeWarningBox()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>恭喜!</strong> 成功修改歌曲 《{{ warningBoxType.sname }}》
    </div>
    <div class="alert alert-success alert-dismissible" role="alert" v-else-if="warningBoxType.type === 3">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeWarningBox()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>恭喜!</strong> 成功删除歌曲 《{{ warningBoxType.sname }}》
    </div>
    <div class="alert alert-danger alert-dismissible" role="alert" v-else-if="warningBoxType.type === 4">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeWarningBox()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>输入内容不能全为空</strong>
    </div>
    <div class="alert alert-danger alert-dismissible" role="alert" v-else-if="warningBoxType.type === 5">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeWarningBox()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>操作失败!</strong> 请检查不合法的输入
    </div>
    <div class="alert alert-success alert-dismissible" role="alert" v-else-if="warningBoxType.type === 6">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeWarningBox()">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>恭喜!</strong> 查询成功
    </div>
    <div class="col-md-9">
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
          <th>操作</th>
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
          <td>
            <button class="btn btn-success" title="编辑" @click="editMusic(item)" style="margin:0 10px">
              <i class="glyphicon glyphicon-pencil" title="编辑"></i>
            </button>
            <button class="btn btn-danger" title="删除" @click="deleteMusic2(item)">
              <i class="glyphicon glyphicon-trash" title="删除"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="col-md-3">
      <div class="dropdown">
        <button class="btn btn-toolbar" title="返回主页" @click="getMusic()">
          <i class="glyphicon glyphicon-home" title="返回主页"></i>
        </button>
        <button class="btn btn-primary" title="添加" @click="plusMusic()" style="margin: 0 10px">
          <i class="glyphicon glyphicon-plus" title="添加"></i> 添加
        </button>
        <button class="btn btn-default dropdown-toggle" title="查询" type="button" id="dropdownMenu1"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" @click="cancelEditBar()">
          <i class="glyphicon glyphicon-search" title="查询"></i> 查询
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
          <li @click="openSearchBar(2)"><a href="#">按照歌名查询</a></li>
          <li @click="openSearchBar(3)"><a href="#">按照歌手查询</a></li>
          <li @click="openSearchBar(4)"><a href="#">按照发行时间查询</a></li>
          <li @click="openSearchBar(5)"><a href="#">按照专辑查询</a></li>
          <li @click="openSearchBar(6)"><a href="#">按照流派查询</a></li>
          <li role="separator" class="divider"></li>
          <li @click="openSearchBar(7)"><a href="#">多条目查询</a></li>
        </ul>
      </div>
      <input type="hidden" v-model="music.sno">
      <p></p>
      <div v-if="type === 1 || type === 2 || type === 7">
        <div class="form-group has-error" v-if="music.sname==='' && snameType===1
        && ((allSpaceType === 1 && checkAllSpace()) || type !== 7)">
          <label for="errName">歌名</label>
          <input type="text" id="errName" class="form-control" placeholder="请输入歌曲名称" v-model="music.sname">
          <span class="help-block" v-if="type !== 7">输入内容不能为空</span>
          <span class="help-block" v-if="type === 7">输入内容不能全为空</span>
        </div>
        <div class="form-group" v-else-if="music.sname===''">
          <label for="name">歌名</label>
          <input type="text" id="name" class="form-control" placeholder="请输入歌曲名称" v-model="music.sname"
                 @click="snameType=1" @input="snameType=1">
        </div>
        <div class="form-group has-success" v-else>
          <label for="sucName">歌名</label>
          <input type="text" id="sucName" class="form-control" placeholder="请输入歌曲名称" v-model="music.sname"
                 @click="snameType=1" @input="snameType=1">
          <span class="help-block"><i class="glyphicon glyphicon-ok"></i></span>
        </div>
      </div>
      <div v-if="type === 1 || type === 3 || type === 7">
        <div class="form-group has-error" v-if="music.sartist==='' && sartistType===1
        && ((allSpaceType === 1 && checkAllSpace()) || type !== 7)">
          <label for="errSinger">歌手</label>
          <input type="text" id="errSinger" class="form-control" placeholder="请输入歌手名称" v-model="music.sartist">
          <span class="help-block" v-if="type!==7">输入内容不能为空</span>
        </div>
        <div class="form-group" v-else-if="music.sartist===''">
          <label for="sartist">歌手</label>
          <input type="text" id="sartist" class="form-control" placeholder="请输入歌手名称" v-model="music.sartist"
                 @click="sartistType=1" @input="sartistType=1">
        </div>
        <div class="form-group has-success" v-else>
          <label for="sucSinger">歌手</label>
          <input type="text" id="sucSinger" class="form-control" placeholder="请输入歌手名称" v-model="music.sartist"
                 @click="sartistType=1" @input="sartistType=1">
          <span class="help-block"><i class="glyphicon glyphicon-ok"></i></span>
        </div>
      </div>
      <div v-if="type === 1 || type === 4 || type === 7">
        <div class="form-group has-error" v-if="music.syear==='' && syearType===1
        && ((allSpaceType === 1 && checkAllSpace()) || type !== 7)">
          <label for="errTime">发行年份</label>
          <input type="text" id="errTime" class="form-control" placeholder="请请输入歌曲发行年份" v-model="music.syear">
          <span class="help-block" v-if="type!==7">输入内容不能为空</span>
        </div>
        <div class="form-group has-error" v-else-if="checkNum()===false && syearType===1">
          <label for="errTimeFormat">发行年份</label>
          <input type="text" id="errTimeFormat" class="form-control" placeholder="请输入歌曲发行年份" v-model="music.syear">
          <span class="help-block">请输入纯数字</span>
        </div>
        <div class="form-group" v-else-if="music.syear===''">
          <label for="syear">发行年份</label>
          <input type="text" id="syear" class="form-control" placeholder="请输入歌曲发行年份" v-model="music.syear"
                 @click="syearType=1" @input="syearType = 1">
        </div>
        <div class="form-group has-success" v-else>
          <label for="sucTime">发行年份</label>
          <input type="text" id="sucTime" class="form-control" placeholder="请输入歌曲发行年份" v-model="music.syear"
                 @click="sartistType=1" @input="syearType = 1">
          <span class="help-block"><i class="glyphicon glyphicon-ok"></i></span>
        </div>
      </div>
      <div v-if="type === 1 || type === 5 || type === 7">
        <div class="form-group has-error" v-if="music.salbum==='' && salbumType===1
        &&((allSpaceType === 1 && checkAllSpace()) || type !== 7)">
          <label for="errAlbum">专辑</label>
          <input type="text" id="errAlbum" class="form-control" placeholder="请输入专辑名称" v-model="music.salbum">
          <span class="help-block" v-if="type !== 7">输入内容不能为空</span>
        </div>
        <div class="form-group" v-else-if="music.salbum===''">
          <label for="album">专辑</label>
          <input type="text" id="album" class="form-control" placeholder="请输入专辑名称" v-model="music.salbum"
                 @click="salbumType=1" @input="salbumType=1">
        </div>
        <div class="form-group has-success" v-else>
          <label for="sucAlbum">专辑</label>
          <input type="text" id="sucAlbum" class="form-control" placeholder="请输入专辑名称" v-model="music.salbum"
                 @click="salbumTypeType=1" @input="salbumType=1">
          <span class="help-block"><i class="glyphicon glyphicon-ok"></i></span>
        </div>
      </div>
      <div v-if="type === 1 || type === 6 || type === 7">
        <div class="form-group has-error" v-if="music.sgenre==='' && sgenreType===1
        && ((allSpaceType === 1 && checkAllSpace()) || type !== 7)">
          <label for="errGenre">流派</label>
          <input type="text" id="errGenre" class="form-control" placeholder="请输入歌曲流派" v-model="music.sgenre">
          <span class="help-block" v-if="type !== 7">输入内容不能为空</span>
        </div>
        <div class="form-group" v-else-if="music.sgenre===''">
          <label for="genre">流派</label>
          <input type="text" id="genre" class="form-control" placeholder="请输入歌曲流派" v-model="music.sgenre"
                 @click="sgenreType=1" @input="sgenreType=1">
        </div>
        <div class="form-group has-success" v-else>
          <label for="sucGenre">流派</label>
          <input type="text" id="sucGenre" class="form-control" placeholder="请输入歌曲流派" v-model="music.sgenre"
                 @click="sgenreType=1" @input="sgenreType=1">
          <span class="help-block"><i class="glyphicon glyphicon-ok"></i></span>
        </div>
      </div>
      <div v-if="type === 1" style="">
        <div class="form-group">
          <button class="btn btn-primary" @click="saveMusic2()">
            <i class="glyphicon glyphicon-ok" title="添加"> </i> 确定
          </button>
          <button class="btn btn-danger" @click="cancelEditBar()" style="margin:0 10px">
            <i class="glyphicon glyphicon-remove" title="取消"> </i> 取消
          </button>
          <button class="btn btn-toolbar" @click="clearEditBar()" style="margin:0 0">
            <i class="glyphicon glyphicon-trash" title="清空"> </i> 清空
          </button>
        </div>
      </div>
      <div class="form-group" v-if="type !== 0 && type !== 1">
        <button class="btn btn-primary" @click="searchMusic()">
          <i class="glyphicon glyphicon-search" title="查询"> </i> 查询
        </button>
        <button class="btn btn-danger" @click="cancelEditBar()" style="margin:0 10px">
          <i class="glyphicon glyphicon-remove" title="取消"> </i> 取消
        </button>
        <button class="btn btn-toolbar" @click="clearEditBar()" style="margin:0 0">
          <i class="glyphicon glyphicon-trash" title="清空"> </i> 清空
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'initial',
  data() {
    return {
      base_url: "http://127.0.0.1:8000/api/music/",
      base_url_delete: "http://127.0.0.1:8000/api/music/delete/",
      base_url_insert: "http://127.0.0.1:8000/api/music/insert/",
      base_url_edit: "http://127.0.0.1:8000/api/music/edit/",
      base_url_search: "http://127.0.0.1:8000/api/music/search/",
      base_url_add_record: "http://127.0.0.1:8000/api/favorite/add/",
      base_url_delete_record: "http://127.0.0.1:8000/api/favorite/delete/",
      ly_list: [],
      music: {sno: '', sname: '', sartist: '', syear: '', salbum: '', sgenre: '',is_fav:false},
      music_blank: {sno: '', sname: '', sartist: '', syear: '', salbum: '', sgenre: '',is_fav:false},
      type: 0,
      warningBoxType: {type: 0, sname: ""},
      snameType: 0,
      sartistType: 0,
      syearType: 0,
      salbumType: 0,
      sgenreType: 0,
      allSpaceType: 0
    }
  },
  mounted() {

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
        this.clearEditBar();
        console.log("post success")
      }).catch(err => {
        console.log(err);
      })
    },
    clearEditBar() {
      this.music = Object.assign({}, this.music_blank);
      this.snameType = 0;
      this.sartistType = 0;
      this.syearType = 0;
      this.salbumType = 0;
      this.sgenreType = 0;
      this.allSpaceType = 0;
    },
    warnOut() {
      this.snameType = 1;
      this.sartistType = 1;
      this.syearType = 1;
      this.salbumType = 1;
      this.sgenreType = 1;
    },
    editMusic(item) {
      //console.log('Successfully entered function editMusic()')
      this.music.sname = item.sname;
      this.music.sartist = item.sartist;
      this.music.syear = item.syear;
      this.music.salbum = item.salbum;
      this.music.sgenre = item.sgenre;
      this.music.sno = item.sno;
      this.type = 1;
    },
    closeWarningBox() {
      this.warningBoxType.type = 0;
    },
    deleteMusic(item) {
      console.log("删除音乐《" + item.sname + "》");
      this.setWarningBox(3);
      this.warningBoxType.sname = item.sname;
      axios.delete(item.url).then(() => {
        this.getMusic();
      }).catch(err => {
        console.log(err);
      })
    },
    deleteMusic2(item) {
      console.log("删除音乐《" + item.sname + "》");
      var params = new URLSearchParams();
      params.append("sname", item.sname);
      params.append("sno", item.sno);
      this.setWarningBox(3);
      this.warningBoxType.sname = item.sname;
      this.$axios({
        method: 'post',
        url: this.base_url_delete,
        data: params
      }).then(() => {
        //console.log("post success")
      }).catch(err => {
        console.log(err);
      })
      this.refresh();
    },
    refresh() {
      var that = this;
      setTimeout(function () {   //设置延迟执行
        that.getMusic();
      }, 100);
    },
    saveMusic2() {
      if (this.check1() === false) {
        this.setWarningBox(5);
        this.warnOut();
        return;
      }
      var params = new URLSearchParams();
      params.append('sname', this.music.sname);
      params.append('sartist', this.music.sartist);
      params.append("syear", this.music.syear);
      params.append("salbum", this.music.salbum);
      params.append("sgenre", this.music.sgenre);
      params.append("sno", this.music.sno);
      if (this.music.sno === "") {
        //新增
        console.log("新增音乐《" + this.music.sname + "》");
        this.setWarningBox(1);
        this.warningBoxType.sname = this.music.sname;
        this.$axios({
          method: 'post',
          url: this.base_url_insert,
          data: params
        }).then(() => {
          console.log("post success")
        }).catch(err => {
          console.log(err);
        })
      } else {
        //编辑
        console.log("编辑音乐《" + this.music.sname + "》");
        this.setWarningBox(2);
        this.warningBoxType.sname = this.music.sname;
        this.$axios({
          method: 'post',
          url: this.base_url_edit,
          data: params
        }).then(() => {
          console.log("post success")
        }).catch(err => {
          console.log(err);
        })
      }
      this.refresh();
      this.type = 0;
    },
    saveMusic() {
      let newData = {
        sname: this.music.sname,
        sartist: this.music.sartist,
        syear: this.music.syear,
        salbum: this.music.salbum,
        sgenre: this.music.sgenre
      }
      if (this.music.url === "") {
        //新增
        console.log("新增音乐《" + this.music.sname + "》");
        axios.post(this.base_url, newData).then(() => {
          this.getMusic();
          this.setWarningBox(1);
          this.warningBoxType.sname = this.music.sname;
        }).catch(err => {
          console.log(err);
        })
      } else {
        //编辑
        console.log("编辑音乐《" + this.music.sname + "》");
        axios.put(this.music.url, newData).then(() => {
          this.getMusic();
          this.setWarningBox(2);
          this.warningBoxType.sname = this.music.sname;
        }).catch(err => {
          console.log(err);
        })
      }
      this.type = 0;
    },
    cancelEditBar() {
      this.type = 0;
      this.clearEditBar();
    },
    checkNum() {
      let i;
      for (i = 0; i < this.music.syear.length; i++) {
        if (this.music.syear[i] > '9' || this.music.syear[i] < '0') {
          return false;
        }
      }
      return true;
    },
    plusMusic() {
      if (this.type !== 1) {
        this.type = 1;
      } else {
        this.cancelEditBar()
      }
      /*var params = new URLSearchParams();
      params.append('name', '巨佬');
      this.$axios({
        method: 'post',
        url: this.base_url_delete,
        data: params
      }).then(() => {
        console.log("post success")
      }).catch(err => {
        console.log(err);
      })*/
    },
    setWarningBox(type) {
      this.warningBoxType.type = type;
      console.log("wait");
      var that = this;
      setTimeout(function () {   //设置延迟执行
        if (that.warningBoxType.type !== 0) {
          console.log("wait end")
          that.closeWarningBox();
        }
      }, 3000);
    },
    openSearchBar(type) {
      this.clearEditBar();
      this.type = type;
    },
    check1() {
      return this.music.sname !== "" && this.music.sartist !== "" && this.music.syear !== ""
          && this.music.salbum !== "" && this.music.sgenre !== "" && this.checkNum(this.music.syear);
    },
    check2() {
      return (this.music.sname !== "" || this.music.sartist !== "" || this.music.syear !== ""
          || this.music.salbum !== "" || this.music.sgenre !== "") && this.checkNum(this.music.syear);
    },
    checkAllSpace() {
      return !(this.music.sname !== "" || this.music.sartist !== "" || this.music.syear !== ""
          || this.music.salbum !== "" || this.music.sgenre !== "");
    },
    searchMusic() {
      if (this.check2() === false) {
        this.warnOut();
        if (this.checkAllSpace()) {
          this.setWarningBox(4);
          this.allSpaceType = 1;
        } else {
          this.setWarningBox(5);
        }
        return;
      }
      var params = new URLSearchParams();
      params.append('sname', this.music.sname);
      params.append('sartist', this.music.sartist);
      params.append("syear", this.music.syear);
      params.append("salbum", this.music.salbum);
      params.append("sgenre", this.music.sgenre);
      if (this.music.sname === "") {
        params.append('s_name', '0');
      } else {
        params.append('s_name', '1');
      }
      if (this.music.sartist === "") {
        params.append('s_artist', '0');
      } else {
        params.append('s_artist', '1');
      }
      if (this.music.syear === "") {
        params.append('s_year', '0');
      } else {
        params.append('s_year', '1');
      }
      if (this.music.salbum === "") {
        params.append('s_album', '0');
      } else {
        params.append('s_album', '1');
      }
      if (this.music.sgenre === "") {
        params.append('s_genre', '0');
      } else {
        params.append('s_genre', '1');
      }
      this.$axios({
        method: 'post',
        url: this.base_url_search,
        data: params
      }).then((res) => {
        console.log("post success");
        this.ly_list = res.data;
        this.setWarningBox(6);
      }).catch(err => {
        console.log(err);
      })
      this.type = 0;
    },
    record(item) {
      var params = new URLSearchParams();
      params.append('sno', item.sno);
      params.append('uno', this.global.uno);
      console.log(item.sno)
      console.log(this.global.uno)
      console.log('*******begin record*******')
      if (item.is_fav === true) {
        console.log('a')
        this.$axios({
          method: 'post',
          url: this.base_url_delete_record,
          data: params
        }).then(() => {
          //console.log("post success")
        }).catch(err => {
          console.log(err);
        })
      } else {
        console.log('b')
        this.$axios({
          method: 'post',
          url: this.base_url_add_record,
          data: params
        }).then(() => {
          //console.log("post success")
        }).catch(err => {
          console.log(err);
        })
      }
      this.refresh();
    }
  },
  created() {
    console.log("shit!!!!!!!!!!!");
    this.getMusic();
    this.music.url = '';
    console.log(this.$store.state.loginUser);
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
</script>

<style>
table, th, td {
  text-align: center;
}

</style>