<template>
  <div class="search-card">
    <div class="card-header">
      <a href="#" class="card-header__define-pos">
        <svg
          class="card-header__pos-icon"
          width="1rem"
          height="1rem"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 297.001 297.001"
          style="enable-background:new 0 0 297.001 297.001;"
          xml:space="preserve"
        >
          <path
            d="M290.444,119.548L14.488,0.818C10.721-0.805,6.343,0.032,3.436,2.93c-2.904,2.898-3.753,7.272-2.142,11.046l118.314,276.933
	c1.581,3.698,5.212,6.092,9.227,6.092c0.033,0,0.065,0,0.1,0c4.053-0.04,7.684-2.515,9.203-6.272l43.921-108.598l108.205-44.074
	c3.745-1.524,6.208-5.15,6.248-9.194C296.551,124.818,294.159,121.146,290.444,119.548z"
          />
        </svg>
        Определить моё местоположение
      </a>
      <input
        class="card-header__input"
        placeholder="Введите адрес или станцию метро"
        v-model.trim="computedSearch"
      />
      <ul class="card-header__tabs">
        <li v-for="filter in filters" v-bind:key="filter.name" v-bind:class="{'card-header__tab': true, 'card-header__tab_active': filter.active}">{{ filter.name }}</li>
      </ul>
    </div>
    <div class="card-header__info">
      Отметьте любимую аптеку и вы всегда будете видеть её первой в списке
    </div>
    <div class="pharms-list">
      <div v-bind:class="{'pharm-item': true, 'pharm-item_active': pharm.active}" v-for="(pharm, key) in selectedPharms" v-bind:key="key">
        <div class="pharm-item__checklist-column">
          <div class="pharm-item__address">{{ pharm.address }}</div>
          <div class="metro pharm-item__metro" v-for="(metro, key) in pharm.metro" v-bind:key="key">
            <div class="pharm-item__metro-color metro__color">
              <div class="metro__color-b" v-bind:style="{backgroundColor: metro.color}"></div>
            </div>
            <div class="metro__name">{{metro.name}}</div>
          </div>
          <div class="pharm-item__type">
            {{ pharm.type }}
          </div>
        </div>
        <div class="pharm-item__schedule-column">
          <div v-for="(schedule) in pharm.schedule" v-bind:key="schedule">
            {{ schedule }}
          </div>
        </div>
        <div class="pharm-item__action-column" v-if="pharm.active">
          <a href="#" class="button">Сбросить</a>
        </div>
        <div class="pharm-item__action-column" v-else>
          <a href="#" class="button button_active" v-on:click="select(pharm.address)">Выбрать</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'SearchCard',
  data: () => ({
    filters: [
      {name: 'Аптека', active: true, mock_name: 'Аптека'},
      {name: 'Аптека/Оптика', active: false, mock_name: 'Оптика'},
      {name: 'Аптека/Оптика/Дрогери', active: false, mock_name: 'Дрогери'},
      {name: '24 часа', active: false, mock_name: '24 часа'}
    ]
  }),
  methods: {
    select(address) {
      this.$store.commit('activePharm', address)
    },
    ...mapMutations(['searchUpdate'])
  },
  computed: {
    computedSearch: {
      get() {
        return this.search;
      },
      set(value) {
        this.searchUpdate(value);
      }
    },
    selectedPharms: function() {
      if (this.search !== '') {
        return this.pharms.filter(
          el => 
          el.address.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 ||
          el.metro.map(m => m.name).join(' ').toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        );
      }
      return this.pharms;
    },
    ...mapState(['pharms', 'search'])
  }
};
</script>

<style lang="scss">
@import "../sass/colors.scss";
@import "../sass/mixins.scss";

.search-card {
  width: 580px;
  height: calc(100% - 12px);
  border: 1px solid $light-grey;
  padding: 5px 0;
}
.card-header {
  @include card-container;
  &__define-pos {
    display: block;
    text-decoration: none;
    padding: 1rem 0;
    color: $dark-grey;
  }
  &__pos-icon {
    margin-right: 5px;
  }
  &__input {
    width: 100%;
    box-sizing: border-box;
    outline: none;
  }
  &__tabs {
    list-style-type: none;
    padding: 0;
    margin: 0;
    margin-top: 5px;
    display: flex;
  }
  &__tab {
    font-size: 1.1rem;
    padding: 1rem 1.66rem;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    &_active {
      border-bottom-color: $base-green;
      color: $base-green;
      font-weight: 700;
    }
  }
  &__info {
    @include card-container;
    text-align: center;
    font-size: 1rem;
    padding: 1.25rem;
    border-top: 1px solid $light-grey;
    border-bottom: 1px solid $light-grey;
  }
}
.pharms-list {
  height: 100%;
  overflow-y: auto;
}
.pharm-item {
  padding: 1.1rem 1.6rem;
  display: flex;
  &:not(:first-of-type) {
    border-top: 1px solid $light-grey;
  }
  &_active {
    outline: 2px solid $base-green;
    outline-offset: -2px;
  }
  &__checklist-column {
    width: 22rem;
    height: 100%;
  }
  &__metro {
    margin-top: 0.5rem;
  }
  &__metro-color {
    width: 8px !important;
    margin-right: 1rem !important;
  }
  &__type {
    margin-top: 0.5rem;
  }
  &__schedule-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 2rem;
    width: 8.33rem;
  }
  &__action-solumn {
    display: flex;
    align-items: center;
  }
}
.button {
  display: inline-block;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  background-color: #DFE6E6;
  color: $dark-grey;
  font-weight: 700;
  font-size: 1.16rem;
  text-decoration: none;
  transition: background-color 250ms, color 250ms;
  height: 1.4rem;
  &_active, &:hover {
    background-color: $base-green;
    color: #fff;
  }
}
</style>
