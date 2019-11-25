<template>
  <div class="yamap" id="map"></div>
</template>

<script>
import { mapState } from 'vuex';

let myMap, BalloonContentLayout;
function init() {
  myMap = new window.ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10
  });

  BalloonContentLayout = window.ymaps.templateLayoutFactory.createClass(
    `<div class="map-popup">
      <div class="map-popup__header">
        <div class="map-popup__icon-container">
          <div class="map-popup__icon"></div>
        </div>
        <div class="map-popup__address">{{properties.name}}</div>
      </div>
      {% for metro in properties.metro %}
      <div class="metro">
        <div class="metro__color">
          <div class="metro__color-b" style="background-color:{{metro.color}};"></div>
        </div>
        <div class="metro__name">{{metro.name}}</div>
      </div>
      {% endfor %}
      <div class="map-popup__container">
        <div class="map-popup__schedule">
          Аптека<br />
          {{properties.schedule}}
        </div>
      </div>
      <a class="button map-popup__button" href="#">Сбросить</a>
    </div>`,
    {
      build: function() {
        BalloonContentLayout.superclass.build.call(this);

        // document.querySelector('.map-popup__button').addEventListener('click', this.onCounterClick);
      },
      clear: function() {
        // document.querySelector('.map-popup__button').removeEventListener('click', this.onCounterClick);
        BalloonContentLayout.superclass.clear.call(this);
      },

      onCounterClick: function() {
        // Do something
      }
    }
  );
}

export default {
  name: 'Yamap',
  created() {
    window.ymaps.ready(init);
  },
  mounted() {
    document.querySelector('.pharms-list').style.height = document.body.clientHeight - document.querySelector('.pharms-list').offsetTop + 'px';
  },
  methods: {
    async geocode(pharms) {
      myMap.geoObjects.removeAll();
      for (let i = 0; i < pharms.length; i++) {
        const pharm = pharms[i];
        let res = await window.ymaps.geocode(pharm.address).catch(() => alert('Ошибка'));
        if (res !== undefined) {
          let myPlacemark = new window.ymaps.Placemark(
            res.geoObjects.get(0).geometry.getCoordinates(),
            {
              name: pharm.address,
              color: pharm.statusColor,
              metro: pharm.metro,
              schedule: pharm.schedule.join(' ')
            },
            {
              balloonContentLayout: BalloonContentLayout,
              iconLayout: 'default#image',
              iconImageHref: require('../assets/pharm.png'),
              iconImageSize: [22, 22],
              balloonOffset: [-1, -35],
              hideIconOnBalloonOpen: false
            }
          );
          myPlacemark.events.add('click', e => {
            // eslint-disable-next-line
            console.log(e.get('target').properties._data.name);
          });
          myMap.geoObjects.add(myPlacemark);
          // eslint-disable-next-line
          console.log({
            name: pharm.address,
            color: pharm.statusColor,
            metro: pharm.metro,
            schedule: pharm.schedule.join(' ')
          });
        }
      }
    }
  },
  computed: {
    ...mapState(['pharms', 'search'])
  },
  watch: {
    pharms() {
      this.geocode(this.pharms.filter(el => el.active));
    },
    search() {
      //
      // Вывести все найденные аптеки
      //
      // let pharms = this.pharms.filter(
      //   el => 
      //   el.address.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
      //   el.metro.join(' ').toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      // );
      // this.geocode(pharms);
    }
  }
};
</script>

<style lang="scss">
@import '../sass/colors.scss';

.yamap {
  flex: 1;
  width: 100%;
  height: 100%;
}
.map-popup {
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  &__container {
    padding-left: 2rem;
  }
  &__icon {
    width: 18px;
    height: 16px;
    background-image: url("data:image/svg+xml, %3Csvg width='18' height='16' viewBox='0 0 18 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.68422 14.244C8.79927 14.1561 8.92484 14.0601 9.05548 13.9598C9.5905 13.549 10.1906 13.0827 10.5087 12.8176L10.5088 12.8176C12.3348 11.2965 13.818 10.057 14.8346 8.87506L14.8346 8.87505C15.9399 7.58995 16.3684 6.49855 16.3684 5.39186C16.3684 4.32419 15.9989 3.35355 15.3585 2.6431C14.6951 1.9073 13.7785 1.5 12.7549 1.5C12.123 1.5 11.3022 1.84305 10.5412 2.29174C10.1817 2.50368 9.87234 2.71695 9.653 2.87726C9.54383 2.95705 9.45825 3.02279 9.40136 3.06743C9.37294 3.08973 9.35177 3.10669 9.33849 3.11743L9.32459 3.12873L9.32306 3.12998L9.32279 3.13021L9.32256 3.1304L9.32226 3.13065L9.32225 3.13065L8.68421 3.66048L8.04617 3.13065L8.04616 3.13065L8.04586 3.1304L8.04564 3.13021L8.04536 3.12998L8.04383 3.12873L8.02993 3.11743C8.01665 3.10669 7.99548 3.08973 7.96707 3.06743C7.91017 3.02279 7.82459 2.95705 7.71542 2.87726C7.49609 2.71695 7.18668 2.50368 6.82722 2.29174C6.06623 1.84305 5.24541 1.5 4.61349 1.5C3.58998 1.5 2.67334 1.9073 2.00993 2.64311L8.68422 14.244ZM8.68422 14.244C8.56917 14.1561 8.44359 14.0601 8.31296 13.9598C7.77796 13.549 7.1779 13.0827 6.85978 12.8177L6.85977 12.8177C5.03362 11.2965 3.55037 10.0569 2.53383 8.87505L2.53382 8.87504C1.42851 7.58999 1 6.49855 1 5.39186C1 4.32419 1.36951 3.35356 2.0099 2.64315L8.68422 14.244Z' stroke='%2300C7B1' stroke-width='2'/%3E%3C/svg%3E");
    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
    }
  }
  &__address {
    padding-left: 0.7rem;
    font-size: 1.1rem;
    color: $dark-grey;
  }
  &__schedule {
    margin-top: 1.5rem;
    line-height: 1.5rem;
    color: $dark-grey;
    font-size: 1.1rem;
  }
  &__button {
    margin-top: 1.5rem;
  }
}
.metro {
  display: flex;
  &__color {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    &-b {
      width: 8px;
      height: 8px;
      border-radius: 100%;
    }
  }
  &__name {
    font-weight: 700;
    color: $dark-grey;
  }
}
</style>
