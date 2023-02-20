<template>
  <div class="BigDas-page-about">
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
    >

      <!-- Text slides with image -->
      <b-carousel-slide caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img-src="https://picsum.photos/1024/480/?image=52"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=58">
      </b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide>
        <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
             src="https://picsum.photos/1024/480/?image=55" alt="image slot">
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut pellentesque
          ut lacus vel interdum.
        </p>
      </b-carousel-slide>

    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      message1: 'Lorem ipsum dolor sit amet, varius eu fusce, at purus nonummy eros pede massa vel. Vel sem massa porta lorem elit, molestie ut massa id vulputate, pede nec. Quam hic duis, ac magnis morbi. Mauris enim ultrices praesent, turpis convallis felis elit integer mauris suscipit. Class vestibulum nunc ut fugiat, neque quam neque eros lacus. Sem magna asperiores posuere tellus mi diam, molestie non suspendisse sit, eleifend fusce, massa vestibulum. Dolor ut quis, iure pellentesque, sit phasellus phasellus dictum massa, donec mauris sed cras ultrices, urna risus justo arcu libero.',
      message2: 'Dictum cras malesuada, eu ac nunc fermentum donec id nec, eget sapien, eget nullam, quisque risus ligula ut nec sem. Sed a dignissim, sed justo quisque. Sit mollis lobortis vel non sapien pellentesque, sed feugiat enim. Dictum vitae vestibulum porta quis, donec arcu nisl turpis, neque suspendisse. Et egestas cursus mi sit libero, mauris rhoncus velit sed etiam lobortis ut. Laoreet ut rutrum congue, pellentesque varius, dolor turpis amet pretium, erat vivamus eget neque elit, aliquet sit tellus in libero. Eu in dolor vitae convallis, vestibulum aliquet facilisis natoque in fermentum praesent, euismod egestas integer suspendisse ut, lorem suscipit pellentesque ultricies dui. Praesent placerat. Unde etiam pharetra massa nam. Non mauris integer tortor fermentum ipsum, diam hendrerit ac parturient sollicitudin nec, lorem felis eget aliquam, lacus id, voluptatem vestibulum in leo orci curabitur felis. Diam faucibus et in id interdum id, pellentesque neque donec adipiscing aliquam, id in in congue, phasellus non arcu scelerisque mi dignissim elementum.',
      message3: 'Sapien fermentum, nullam consectetuer enim sit elit dolor egestas, eget elit risus vitae eu, suspendisse malesuada nulla cum turpis parturient. Tortor consectetuer sed. Sapien quis in, ligula a hac, enim ligula. Dui morbi mi venenatis amet, pellentesque sed odio ac ante nullam, nec tempus vel, consectetuer etiam, quam integer congue ipsum pellentesque in sit. Orci posuere, erat scelerisque tempus in, tempor quam laoreet. Ipsum pellentesque integer sociosqu lacinia, sapien rutrum ante nulla dui mattis, venenatis molestie et fringilla in nec convallis. Maecenas duis sit massa nullam, natoque per commodo posuere vitae, scelerisque nulla libero commodo. Luctus qui etiam, scelerisque non mauris tellus, vitae metus et duis metus, tellus mattis sed quam. Cum felis luctus pellentesque, justo purus viverra.',
      message4: 'Luctus quis id orci, sit neque ornare, lectus varius varius vestibulum. Nulla condimentum ad. Vestibulum ante gravida. Quis donec proin, nec morbi id pede, euismod mi et quis vestibulum sed rhoncus, ullamcorper pede. Id sit tincidunt. Sodales arcu, maecenas integer, convallis ipsum libero sociis cursus in, metus a et in ipsum est sunt. Nec in ornare sit. Porttitor pellentesque iaculis velit, aliquet fringilla nunc eu pretium, malesuada sed ac pulvinar.',
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>
.BigDas-page-about {
  display: flex;
  flex-direction: column;
}
</style>
