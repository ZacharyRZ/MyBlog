<template>
  <article>
    <EditComponent v-if="editShow" :info="blogInfo" @close="close" :dialogtitile="dialogtitile"></EditComponent>
    <z-container>
      <z-table :prop_headerOptions="headerOptions" :prop_keyword="keyword" :prop_getMethod="GetAllBlogs" :prop_delMethod="updateBlog"
        :prop_list="blogList" :prop_DataTotal="blogTotal" @editblog="editblog" @getList="getList" ref="pageinfo"></z-table>
    </z-container>
  </article>
</template>

<script>
import { mapGetters } from "vuex";
import EditComponent from "./add/index";
export default {
  components: {
    EditComponent
  },
  data() {
    return {
      editShow: false,
      GetAllBlogs: "GetAllBlogs",
      updateBlog: "deletebyisvisiable",
      dialogtitile:'',
      blogInfo: {},
      keyword: "",
      headerOptions: [
        {
          label: "_id",
          prop: "_id",
          hidden: true,
          headerAlign: "center",
          align: "center"
        },
        {
          label: "类型",
          prop: "type",
          hidden: false,
          headerAlign: "center",
          align: "center"
        },
        {
          label: "标题",
          prop: "title",
          hidden: false,
          headerAlign: "center",
          align: "center",
          sort: true
        },
        {
          label: "描述",
          prop: "desc",
          hidden: false,
          headerAlign: "center",
          align: "center"
        },
        {
          label: "来源",
          prop: "source",
          hidden: false,
          headerAlign: "center",
          align: "center"
        },
        {
          label: "级别",
          prop: "level",
          hidden: false,
          headerAlign: "center",
          align: "center"
        },
        {
          label: "发布时间",
          prop: "releaseTime",
          hidden: false,
          headerAlign: "center",
          align: "center",
          sort: true
        },
        {
          label: "是否可见",
          prop: "isVisible",
          hidden: false,
          headerAlign: "center",
          align: "center"
        }
      ]
    };
  },
  created() {
    this.getList(10,1);
  },
  methods: {
    close() {
      console.log('123')
      this.editShow = false;
      this.getList(this.$refs.pageinfo.pagesize,this.$refs.pageinfo.pageindex);
    },
    async getList(pagesize,pageindex) {
      this.loading = true;
      try {
        await this.$store.dispatch("GetAllBlogs", {
          keyword: this.keyword,
          pageindex: pageindex,
          pagesize: pagesize
        });
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },
    editblog(scope) {
      //console.log(scope);
      this.editShow = true;
      //scope.row.releaseTime = new Date(scope.row.releaseTime);
      this.blogInfo = Object.assign(scope.row);
    }
  },
  computed: {
    ...mapGetters(["blogList", "blogTotal"])
  }
};
</script>

<style lang="less">

</style>
