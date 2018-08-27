<template>
  <div class="hello">
    <h2>AirGrab</h2>
    <p>这里放一些AirGrab介绍</p>

    <table>
      <tr>
        <th>代币</th>
        <th>描述</th>
        <th>官网</th>
        <th>Grab</th>
      </tr>
      <tr v-for="item, index in {grabList}" >
        <td>{{item.sybmol}}</td>
        <td>{{item.description}}</td>
        <td>{{item.website}}</td>
        <td><button @click="grab(item.sybmol)">AirGrab</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      currentAccount: ''
    }
  },
  computed: {
    grabList: function () {
      return [
        {
          sybmol: 'ATD',
          description: 'Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!',
          website: 'https://www.atidium.io/',
          contract: 'eosatidiumio',
          actionName: 'signup',
          data: {
            owner: this.currentAccount,
            quantity: '0.0000 ATD'
          }
        },
        {
          sybmol: 'RIDL',
          description: 'Support Scatter and trustless reputation on blockchain.',
          website: 'https://ridl.get-scatter.com',
          contract: 'ridlridlcoin',
          actionName: 'claim',
          data: {
            claimer: this.currentAccount
          }
        },
        {
          sybmol: 'TRYBE',
          description: 'A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.',
          website: 'https://trybe.one',
          contract: 'trybenetwork',
          actionName: 'claim',
          data: {
            claimer: this.currentAccount
          }
        },
        {
          sybmol: 'WIZZ',
          description: 'Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!',
          website: 'https://wizz.network/',
          contract: 'wizznetwork1',
          actionName: 'signup',
          data: {
            owner: this.currentAccount,
            quantity: '0.0000 WIZZ'
          }
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
