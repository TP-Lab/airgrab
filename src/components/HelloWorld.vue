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
          <img class="logo" :src="item.logo" >
          <div class="base-info">
            <span class="symbol">{{item.symbol}}</span><br>
            <a class="website" :href="item.website">{{item.website}}</a> 
          </div>
          <span class="balance">
            <button v-if="item.valid" class="grab-btn" @click="grab(index)">AirGrab</button>
            <span v-else>{{item.balance}}</span>
          </span> 
        </div>
        <hr>
        <div><span class="label-title">简介:</span> {{item.description}}</div>
        <div></div>
      </div>
      <p class="intro">本工具数据来源：https://eostoolkit.io/airgrab </p>
  </div>
</template>

<script>
import tp from "tp-eosjs";
import _ from 'lodash';
import Vue from 'vue';

export default {
  name: "HelloWorld",
  data() {
    return {
      currentAccount: "",
      currentAddress: '',
      grabList: [
        {
          symbol: "ATD",
          logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_eosatidiumio_ATD.png',
          description:
            "Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!",
          website: "https://www.atidium.io/",
          contract: "eosatidiumio",
          claimKey: 'owner',
          actionName: "signup",
          data: {
            quantity: "0.0000 ATD"
          },
          valid: true,
          balance: ''
        },
        {
          symbol: "RIDL",
          logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_ridlridlcoin_RIDL.png',
          description:
            "Support Scatter and trustless reputation on blockchain.",
          website: "https://ridl.get-scatter.com",
          contract: "ridlridlcoin",
          claimKey: 'claimer',
          actionName: "claim",
          data: {},
          valid: true,
          balance: ''
        },
        {
          symbol: "TRYBE",
          logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_trybenetwork_TRYBE.png',
          description:
            "A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.",
          website: "https://trybe.one",
          contract: "trybenetwork",
          claimKey: 'claimer',
          actionName: "claim",
          data: {},
          valid: true,
          balance: ''

        },
        {
          symbol: "WIZZ",
          logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_wizznetwork1_WIZZ.png',
          description:
            "Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!",
          website: "https://wizz.network/",
          contract: "wizznetwork1",
          claimKey: 'owner',
          actionName: "signup",
          data: {
            quantity: "0.0000 WIZZ"
          },
          valid: true,
          balance: ''
        },
        {
          symbol: "POOR",
          logo: 'https://dapp.mytokenpocket.vip/token-logo/EOS_poormantoken_POOR.png',
          description:
            "A public test of the airgrab and alternative airdrop methods.",
          website: "https://eostoolkit.io/airgrab",
          contract: "poormantoken",
          claimKey: 'owner',
          actionName: "signup",
          data: {
            quantity: "0.0000 POOR"
          },
          valid: true,
          balance: ''
        }
      ]
    };
  },
  created() {
    tp.getCurrentWallet().then(res => {
      if (res.result) {
        this.currentAccount = res.data.name;
        this.currentAddress = res.data.address;

        this.getUserInfo();
      }
    });
  },

  methods: {
    grab(index) {
      let grabInfo = this.grabList[index];

      let extendsData = {};
      extendsData[grabInfo.claimKey] = this.currentAccount;
  
      tp.pushEosAction({
        actions: [
            {
                account: grabInfo.contract,
                name: grabInfo.actionName,
                authorization: [{
                    actor: this.currentAccount,
                    permission: 'active'
                }],
                data: _.assignIn(grabInfo.data, extendsData)
            }
        ],
        account: this.currentAccount,
        address: this.currentAddress
      }).then(res => {
        if (res.result) {
          Dialog.init('执行成功');
          this.getUserInfo();
        }
        else {
          Dialog.init('执行失败');
          this.getUserInfo();
        }
      });
    },
    getUserInfo() {
      let grabList = this.grabList;
      _.forEach(grabList, item => {
        let params = {
          account: this.currentAccount,
          contract: item.contract,
          symbol: item.symbol
        }
        tp.getEosBalance(params).then(res => {
          if (res.result) {
            if (res.data.balance && res.data.balance.length) {
              item.valid = false;
              item.balance = res.data.balance[0];
            }
          }
        })
      });

      this.grabList = grabList;
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
  padding: 10px;
  margin: 10px 0 20px;
  font-size: 12px;
  background-color: #f9f9f9;
 
  background: linear-gradient(
    to right,
    rgb(250, 251, 252) 0%,
    rgb(243, 245, 247) 100%
  ); 

  box-shadow: 0 0 5px 0 #ddd;
}

.logo {
  width: 35px;
  height: 35px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}
hr {
  border: none;
  border-bottom: 1px solid #eee;
}
.base-info {
  display: inline-block;
  vertical-align: middle
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
  padding: 6px 13px;
  background: rgb(122, 188, 255); /* Old browsers */
 
  background: linear-gradient(
    to right,
    rgba(122, 188, 255, 1) 0%,
    rgba(96, 171, 248, 1) 46%,
    rgba(96, 171, 248, 1) 46%,
    rgba(64, 150, 238, 1) 100%
  ); 
}
.website {
  text-decoration: none;
  color: #3775dc;
}
.title {
  line-height: 30px;
  margin: 0 0 4px;
}

.balance {
  display: inline-block;
  float: right;
}

</style>
