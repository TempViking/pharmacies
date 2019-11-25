<template>
  <div id="app">
    <search-card />
    <yamap />
  </div>
</template>

<script>
import SearchCard from './components/SearchCard.vue';
import Yamap from './components/Yamap.vue';

let pharms = [
  {
    metro: 'м. Новокосино',
    metroClass: 'm-yellow',
    address: 'Реутов, Дзержинского ул. 11-В',
    statusColor: 'yellow',
    statusText: 'меньше 3 шт.',
    schedule: ['Круглосуточно'],
    price: '383,00 Р',
    type: 'pharm ortop drog home',
    checklist: 'pharm ortop drog home 24hours',
    id: '105543'
  },
  {
    metro: 'м. Новокосино',
    metroClass: 'm-yellow',
    address: 'Пушкина ул. 12-В, корп. 834',
    statusColor: 'yellow',
    statusText: 'осталась 1 шт',
    schedule: ['Ежедневно', '8:00-22:00'],
    price: '40110,00 Р',
    type: 'pharm optic drog',
    checklist: 'pharm optic drog',
    id: '1974052'
  },
  {
    metro: 'м. Молодёжная',
    metroClass: 'm-yellow',
    address: 'Ельнинская ул., 23 стр. 2',
    statusColor: 'green',
    statusText: 'больше 3 шт.',
    schedule: ['Круглосуточно'],
    price: '213213,00 Р',
    type: 'pharm optic drog',
    checklist: 'pharm optic drog 24hours',
    id: '1054736'
  },
  {
    metro: 'г. Зеленоград',
    metroClass: 'm-yellow',
    address: 'Ельнинская ул., 23 стр. 2',
    statusColor: 'green',
    statusText: 'больше 3 шт.',
    schedule: ['24 часа'],
    price: '2133,00 Р',
    type: 'pharm ortop',
    checklist: 'pharm ortop 24hours',
    id: '4473109'
  },
  {
    metro: 'м. Алтуфьево',
    metroClass: 'm-seraya',
    address: 'Лескова ул., 2',
    statusColor: 'red',
    statusText: 'осталась 1 шт.',
    schedule: ['24 часа'],
    price: '2133,00 Р',
    type: 'pharm optic ortop drog',
    checklist: 'pharm optic ortop drog 24hours',
    id: '8731677'
  },
  {
    metro: 'м. Кузнецкий мост',
    metroClass: 'komend',
    address: 'Пушечная ул., 9/6 стр. 1',
    statusColor: 'red',
    statusText: 'осталась 1 шт.',
    schedule: ['Круглосуточно'],
    price: '2133,00 Р',
    type: 'drog',
    checklist: 'drog 24hours',
    id: '1186335'
  },
  {
    metro: 'м. Братиславская',
    metroClass: 'primor',
    address: 'Пушечная ул., 9/6 стр. 1',
    statusColor: 'green',
    statusText: 'более 3 шт.',
    schedule: ['Ежедневно', '08:00 - 22:00'],
    price: '21323,00 Р',
    type: 'pharm',
    checklist: 'pharm',
    id: '4671784'
  },
  {
    metro: 'м. Ленинский Проспект',
    metroClass: 'm-orange',
    address: 'Ленинский Проспект ул., 12',
    statusColor: 'green',
    statusText: 'более 3 шт.',
    schedule: ['Круглосуточно'],
    price: '21323,00 Р',
    type: 'optic ortop',
    checklist: 'optic ortop 24hours',
    id: '4671799'
  },
  {
    metro: 'м. Девяткино',
    metroClass: 'primor',
    address: 'Девяткино ул. 25',
    statusColor: 'green',
    statusText: 'более 3 шт.',
    schedule: ['Круглосуточно'],
    price: '21323,00 Р',
    type: 'optic',
    checklist: 'optic 24hours',
    id: '4473105'
  },
  {
    metro: 'м. Спасская',
    metroClass: 'primor',
    address: 'Спасская ул. 25',
    statusColor: 'green',
    statusText: 'более 3 шт.',
    schedule: ['Круглосуточно'],
    price: '21323,00 Р',
    type: 'optic drog',
    checklist: 'optic drog 24hours',
    id: '4678967'
  },
  {
    metro: 'м. Преображенская площадь',
    metroClass: 'primor',
    address: 'Колодезный переулок, 3с29',
    statusColor: 'red',
    statusText: 'более 3 шт.',
    schedule: ['Круглосуточно'],
    price: '21323,00 Р',
    type: 'optic drog',
    checklist: 'optic drog 24hours',
    id: '4678968'
  }
];

export default {
  name: 'app',
  created() {
    // Имитация запроса к серверу
    setTimeout(() => {
      let mPharms = [];
      for (let i = 0; i < pharms.length; i++) {
        let id = -1;
        for (let a = 0; a < mPharms.length; a++) {
          if (mPharms[a].address === pharms[i].address) {
            id = a;
            break;
          }
        }
        if (id < 0) {
          mPharms.push({
            address: pharms[i].address,
            type: pharms[i].checklist
              .split(' ')
              .map(el => {
                switch (el) {
                  case 'pharm':
                    return 'Аптека';
                  case '24hours':
                    return '24 часа';
                  case 'optic':
                    return 'Оптика';
                  case 'drog':
                    return 'Дрогери';
                }
              })
              .join(' '),
            schedule: pharms[i].schedule,
            metro: [
              {
                name: pharms[i].metro,
                color: pharms[i].statusColor
              }
            ],
            active: false
          });
        } else {
          mPharms[id].metro.push({
            name: pharms[i].metro,
            color: pharms[i].statusColor
          });
        }
      }
      this.$store.commit('setPharms', mPharms);
    }, 1000);
  },
  components: {
    Yamap,
    SearchCard
  }
};
</script>

<style lang="scss">
@import "./sass/base.scss";
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

#app {
  height: 100%;
  font-family: "Roboto", sans-serif;
  display: flex;
}
</style>
