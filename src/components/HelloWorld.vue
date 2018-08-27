<template>
  <div class="hello">
    <p class="intro">AirGrab 是一种糖果分发的方式，需要消耗用户的内存（每种代币大概需要0.25KB 左右）。执行AirGrab后需要等待项目方空投。具体空投时间请查看各项目的简介和官网。</p>
      <!-- <div id="divselect"> 
          <em>请选择账号</em> 
          <ul class="account-ul">
          </ul> 
      </div>  -->
      <div class="current-account">当前账号：{{currentAccount}}</div>
      <div class="air-item" v-for="item, index in grabList">
        <div class="title">
          <span class="symbol">代币:{{item.symbol}}</span> 
          <span class="balance">
            <button class="grab-btn" @click="grab(index)">AirGrab</button>
          </span> 
        </div>
        <div><span class="label-title">官网:</span>  <a class="website" :href="item.website">{{item.website}}</a> </div>
        <div><span class="label-title">简介:</span> {{item.description}}</div>
        <div></div>
      </div>
      <p class="intro">本工具数据来源：https://eostoolkit.io/airgrab </p>
  </div>
</template>

<script>
import tp from "tp-eosjs";

export default {
  name: "HelloWorld",
  data() {
    return {
      currentAccount: "",
      currentAddress: ''
      // ,
      // accountList: []
    };
  },
  created() {
    tp.getCurrentWallet().then(res => {
      if (res.result) {
        this.currentAccount = res.data.name;
        this.currentAddress = res.data.address;
      }
    });
    // Promise.all([walletListApi, currentWalletApi]).then(dataArr => {
    //   let walletList = dataArr[0];
    //   let currentWallet = dataArr[1];
    //   let accountList = _find(walletList, wallet => wallet.blockchain_id === 4);
    // });
  },
  computed: {
    grabList: function() {
      return [
        {
          symbol: "ATD",
          description:
            "Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!",
          website: "https://www.atidium.io/",
          contract: "eosatidiumio",
          actionName: "signup",
          data: {
            owner: this.currentAccount,
            quantity: "0.0000 ATD"
          }
        },
        {
          symbol: "RIDL",
          description:
            "Support Scatter and trustless reputation on blockchain.",
          website: "https://ridl.get-scatter.com",
          contract: "ridlridlcoin",
          actionName: "claim",
          data: {
            claimer: this.currentAccount
          }
        },
        {
          symbol: "TRYBE",
          description:
            "A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.",
          website: "https://trybe.one",
          contract: "trybenetwork",
          actionName: "claim",
          data: {
            claimer: this.currentAccount
          }
        },
        {
          symbol: "WIZZ",
          description:
            "Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!",
          website: "https://wizz.network/",
          contract: "wizznetwork1",
          actionName: "signup",
          data: {
            owner: this.currentAccount,
            quantity: "0.0000 WIZZ"
          }
        }
      ];
    }
  },
  methods: {
    grab(index) {
      let grabInfo = this.grabList[index];
  
      tp.pushEosAction({
        actions: [
            {
                account: grabInfo.contract,
                name: grabInfo.actionName,
                authorization: [{
                    actor: this.currentAccount,
                    permission: 'active'
                }],
                data: grabInfo.data
            }
        ],
        account: this.currentAccount,
        address: this.currentAddress
      }).then(res => {
        if (res.result) {
          Dialog.init('执行成功,txid:' + res.data.transactionId);
        }
        else {
          Dialog.init('执行失败'+ JSON.stringify(res.data));
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.intro {
  font-size: 13px;
  padding: 0 10px;
  margin-bottom: 20px;
}
.air-item {
  border: 1px solid #f1f1f1;
  padding: 8px;
  margin: 10px 0 15px;
  font-size: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 0 5px 0 #eee;
}

.current-account {
  font-size: 13px;
  color: #333;
}

div {
  line-height: 1.5;
}
.symbol {
  font-size: 14px;
  font-weight: bold;
}
.label-title {
  font-size: 12px;
  font-weight: bold;
}
.grab-btn {
  -webkit-appearance: none;
  border-radius: 2px;
  border: none;
  color: #fff;
  padding: 5px 12px;
  background: rgb(122, 188, 255); /* Old browsers */
  background: -moz-linear-gradient(
    left,
    rgba(122, 188, 255, 1) 0%,
    rgba(96, 171, 248, 1) 46%,
    rgba(96, 171, 248, 1) 46%,
    rgba(64, 150, 238, 1) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    left,
    rgba(122, 188, 255, 1) 0%,
    rgba(96, 171, 248, 1) 46%,
    rgba(96, 171, 248, 1) 46%,
    rgba(64, 150, 238, 1) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to right,
    rgba(122, 188, 255, 1) 0%,
    rgba(96, 171, 248, 1) 46%,
    rgba(96, 171, 248, 1) 46%,
    rgba(64, 150, 238, 1) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
}
.website {
  text-decoration: none;
  color: #223ee8;
}
.title {
  line-height: 30px;
  margin: 0 0 4px;
}

.balance {
  display: inline-block;
  float: right;
}

#divselect {
    display: inline-block;
    vertical-align: middle;
    color: #666;
    font-size: 13px;
    width: 120px;
    background-image: url(../../static/img/cc-down.png);
    background-repeat: no-repeat;
    background-position: right center;
    background-size: contain;
  }

  .account-ul {
    margin-top: 0;
    margin-bottom: 1rem;
    position: absolute;
    list-style: none;
    padding: 0;
    display: none;
    border: 1px solid #f1f1f1;
    border-top: none;
    z-index: 100;
  }

  
  .account-ul li {
    line-height: 30px;
    background: #000;
    padding: 4px 16px;
    font-size: 14px;
    border-bottom: 1px solid #333;
  }

  .account-ul li:last-child {
      border-bottom: none;
  }


  #divselect em {
    padding: 2px 10px 2px 6px;
    line-height: 20px;
    display: inline-block;
    width: 100%;
    color: #666;
    font-style: normal;
  }
</style>
