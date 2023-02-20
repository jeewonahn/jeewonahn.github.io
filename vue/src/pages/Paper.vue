<template>
  <div class="BigDas-page-paper">
    <b-container fluid>
      <b-row>
        <b-col class="BigDas-nested-sidebar" md="3" lg="2">
          <div class="BigDas-nested-categories d-md-none">
            <div class="BigDas-nested-categories-label">Categories</div>
            <icon class="BigDas-nested-categories-button" name="align-justify" />
          </div>
          <b-nav id="sidebar_collapse" vertical>
            <b-nav-item>International Journals</b-nav-item>
            <b-nav-item>International Conferences</b-nav-item>
            <b-nav-item>Domestic Journals</b-nav-item>
            <b-nav-item>Domestic Conferences</b-nav-item>
          </b-nav>
        </b-col>
        <b-col>
          <p>{{ message1 }}</p>
          <p>{{ message1 }}</p>
          <p>{{ message2 }}</p>
          <p>{{ message2 }}</p>
          <p>{{ message3 }}</p>
          <p>{{ message3 }}</p>
          <p>{{ message4 }}</p>
          <p>{{ message4 }}</p>
        </b-col>
        <b-col class="d-none d-lg-block" lg="2">
          Quick Nav
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Paper',
  data() {
    return {
      message1: 'Lorem ipsum dolor sit amet, varius eu fusce, at purus nonummy eros pede massa vel. Vel sem massa porta lorem elit, molestie ut massa id vulputate, pede nec. Quam hic duis, ac magnis morbi. Mauris enim ultrices praesent, turpis convallis felis elit integer mauris suscipit. Class vestibulum nunc ut fugiat, neque quam neque eros lacus. Sem magna asperiores posuere tellus mi diam, molestie non suspendisse sit, eleifend fusce, massa vestibulum. Dolor ut quis, iure pellentesque, sit phasellus phasellus dictum massa, donec mauris sed cras ultrices, urna risus justo arcu libero.',
      message2: 'Dictum cras malesuada, eu ac nunc fermentum donec id nec, eget sapien, eget nullam, quisque risus ligula ut nec sem. Sed a dignissim, sed justo quisque. Sit mollis lobortis vel non sapien pellentesque, sed feugiat enim. Dictum vitae vestibulum porta quis, donec arcu nisl turpis, neque suspendisse. Et egestas cursus mi sit libero, mauris rhoncus velit sed etiam lobortis ut. Laoreet ut rutrum congue, pellentesque varius, dolor turpis amet pretium, erat vivamus eget neque elit, aliquet sit tellus in libero. Eu in dolor vitae convallis, vestibulum aliquet facilisis natoque in fermentum praesent, euismod egestas integer suspendisse ut, lorem suscipit pellentesque ultricies dui. Praesent placerat. Unde etiam pharetra massa nam. Non mauris integer tortor fermentum ipsum, diam hendrerit ac parturient sollicitudin nec, lorem felis eget aliquam, lacus id, voluptatem vestibulum in leo orci curabitur felis. Diam faucibus et in id interdum id, pellentesque neque donec adipiscing aliquam, id in in congue, phasellus non arcu scelerisque mi dignissim elementum.',
      message3: 'Sapien fermentum, nullam consectetuer enim sit elit dolor egestas, eget elit risus vitae eu, suspendisse malesuada nulla cum turpis parturient. Tortor consectetuer sed. Sapien quis in, ligula a hac, enim ligula. Dui morbi mi venenatis amet, pellentesque sed odio ac ante nullam, nec tempus vel, consectetuer etiam, quam integer congue ipsum pellentesque in sit. Orci posuere, erat scelerisque tempus in, tempor quam laoreet. Ipsum pellentesque integer sociosqu lacinia, sapien rutrum ante nulla dui mattis, venenatis molestie et fringilla in nec convallis. Maecenas duis sit massa nullam, natoque per commodo posuere vitae, scelerisque nulla libero commodo. Luctus qui etiam, scelerisque non mauris tellus, vitae metus et duis metus, tellus mattis sed quam. Cum felis luctus pellentesque, justo purus viverra.',
      message4: 'Luctus quis id orci, sit neque ornare, lectus varius varius vestibulum. Nulla condimentum ad. Vestibulum ante gravida. Quis donec proin, nec morbi id pede, euismod mi et quis vestibulum sed rhoncus, ullamcorper pede. Id sit tincidunt. Sodales arcu, maecenas integer, convallis ipsum libero sociis cursus in, metus a et in ipsum est sunt. Nec in ornare sit. Porttitor pellentesque iaculis velit, aliquet fringilla nunc eu pretium, malesuada sed ac pulvinar.',
    };
  },
};
</script>

<style scoped>
.BigDas-page-paper {
  display: flex;
  flex-direction: column;
}

.BigDas-nested-sidebar {
  border-bottom: 1px solid rgba(0, 0, 0, .1);
}
@media screen and (min-width: 768px) {
  .BigDas-nested-sidebar {
    border-right: 1px solid rgba(0, 0, 0, .1);
  }
}

.BigDas-nested-sidebar-categories {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.BigDas-nested-sidebar-categories-label {
  flex: 1;
}

.BigDas-nested-categories-button {
  width: 24px;
  height: 24px;
}

</style>
