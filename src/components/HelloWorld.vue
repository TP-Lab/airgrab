<template>
  <div class="hello">
    <!-- <div id="divselect">
          <em>请选择账号</em>
          <ul class="account-ul">
          </ul>
    </div>-->
    <div class="current-account">{{$t('i18nView.account')}}：{{currentAccount}}</div>

    <h3>AirGrab</h3>
    <p class="intro">{{$t('i18nView.text')}}</p>
    <div class="air-item" v-for="(item, index) in grabList">
      <div class="title">
        <img class="logo" :src="item.logo" />
        <div class="base-info">
          <span class="symbol">{{item.symbol}}</span>
          <br />
          <a class="website" :href="item.website">{{item.website}}</a>
        </div>
        <span class="balance">
          <button v-if="item.valid" class="grab-btn" @click="grab(index, 'airgrab')">AirGrab</button>
          <span v-else>{{item.balance}}</span>
        </span>
      </div>
      <hr />
      <div class="desc">
        <span class="label-title">{{$t('i18nView.synopsis')}}:</span>
        {{item.description}}
      </div>
      <div v-if="item.keywords">
        <span class="label-title">{{$t('i18nView.keyword')}}:</span>
        {{item.keywords}}
      </div>
      <div></div>
    </div>

    <h3>Claim</h3>
    <p class="intro">{{$t('i18nView.claimText')}}</p>
    <div class="air-item" v-for="(item, index) in claimList">
      <div class="title">
        <img class="logo" :src="item.logo" />
        <div class="base-info">
          <span class="symbol">{{item.symbol}}</span>
          <br />
          <a class="website" :href="item.website">{{item.website}}</a>
        </div>
        <span class="balance">
          <button
            v-if="item.canClaim"
            class="grab-btn"
            @click="grab(index, 'claim')"
          >Claim {{item.balance}}</button>
          <span v-else-if="item.claimed">{{$t('i18nView.claimed')}} {{item.balance}}</span>
          <span v-else>{{$t('i18nView.unavailable')}}</span>
        </span>
      </div>
      <hr />
      <div class="desc">
        <span class="label-title">{{$t('i18nView.synopsis')}}:</span>
        {{item.description}}
      </div>
      <div v-if="item.keywords">
        <span class="label-title">{{$t('i18nView.keyword')}}:</span>
        {{item.keywords}}
      </div>
      <div></div>
    </div>
    <!-- <p class="intro">{{$t('i18nView.data')}}：https://eostoolkit.io/airgrab</p> -->
  </div>
</template>

<script>
import tp from "tp-eosjs";
import _ from "lodash";

export default {
  name: "HelloWorld",
  data() {
    return {
      currentAccount: "",
      currentAddress: "",

      claimList: [
        {
          symbol: "MPT",
          logo:
            "https://tp-statics.cdn.bcebos.com/token/1554727183622-metpacktoken-mpt.png",
          description:
            "A blockchain-based solution to improve cost-effectiveness within the metal packaging industry.",
          website: "http://www.metpacktoken.org/",
          keywords: this.$t("i18nView.mptSnapshot"),
          contract: "metpacktoken",
          claimKey: "owner",
          actionName: "claim",
          data: {
            sym: "4,MPT"
          },
          canClaim: false,
          claimed: false,
          valid: true,
          balance: ""
        },
        {
          symbol: "EMT",
          logo: "https://tp-statics.cdn.bcebos.com/token/EOS_Manatenew.PNG",
          description:
            "TECHNOLOGY FOR THE FUTURE OF MUSIC.Claim the 10 EMT airdrop and discover the benefits of holding EMT tokens.",
          website: "https://emanate.live/",
          keywords: this.$t("i18nView.emtSnapshot"),
          contract: "emanateoneos",
          claimKey: "owner",
          actionName: "claim",
          data: {
            sym: "4,EMT"
          },
          canClaim: false,
          claimed: false,
          valid: true,
          balance: ""
        },
        {
          symbol: "ZOS",
          logo:
            "https://tp-statics.cdn.bcebos.com/token/BOS_zosdiscounts_ZOS.jpg",
          description:
            "ZOS is a unique token on the EOS Blockchain. ZOS is an Electronic Discount Token System and offers discounts on payments for services rendered by AirDropsDAC.",
          website: "https://www.airdropsdac.com/zos",
          keywords: this.$t("i18nView.zosSnapshot"),
          contract: "zosdiscounts",
          claimKey: "owner",
          actionName: "claim",
          data: {
            sym: "4,ZOS"
          },
          canClaim: false,
          claimed: false,
          valid: true,
          balance: ""
        },
        {
          symbol: "PEOS",
          logo:
            "https://tp-statics.cdn.bcebos.com/token/1551067319125-peostoken.jpg",
          description:
            "pEOS enables private & untraceable transactions on EOS.",
          website: "https://peos.one/",
          keywords:
            this.$t("i18nView.finished") +
            "," +
            this.$t("i18nView.peosSnapshot"),
          contract: "thepeostoken",
          claimKey: "owner",
          actionName: "claim",
          data: {
            sym: "PEOS"
          },
          canClaim: false,
          claimed: false,
          valid: false,
          balance: ""
        },
        {
          symbol: "TULIP",
          logo:
            "https://tp-statics.cdn.bcebos.com/token/1557154701951-tulip.png",
          description:
            "Use TULIP at the Tulip Conference and EOSIO Block Producer & Technology Summit! June 3rd to 6th - San Francisco ",
          website: "https://www.tulipconf.com/",
          keywords: this.$t("i18nView.finished"),
          contract: "tulip.vr",
          claimKey: "owner",
          actionName: "claim",
          data: {
            sym: "4,TULIP"
          },
          canClaim: false,
          claimed: false,
          valid: false,
          balance: ""
        }
      ],
      grabList: [
        {
          symbol: "BBT",
          logo:
            "https://tp-statics.tokenpocket.pro/token/1570545522024-blockbase-coin.png",
          description:
            "BlockBase is a distributed system that runs on EOSIO and provides secure and distributed database storage services. It’s designed to assure confidentiality, integrity and availability of the data it stores. It’s easily scalable, and can store databases from small Dapps up to enterprise businesses.",
          website: "https://www.blockbase.network/",
          keywords: this.$t("i18nView.bbtAirgrab"),
          contract: "blockbasetkn",
          claimKey: "owner",
          actionName: "signup",
          data: {
            quantity: "0.0000 BBT"
          },
          valid: true,
          balance: ""
        },

        {
          symbol: "ATD",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_eosatidiumio_ATD.png",
          description:
            "Payments & Budget Management Decentralized App Leveraging the Blockchain, Cryptocurrency and AI Technologies. Drops happen every 24 hours, Airgrab Today!",
          website: "https://www.atidium.io/",
          keywords:
            this.$t("i18nView.genesis") + "," + this.$t("i18nView.atdRatio"),
          contract: "eosatidiumio",
          claimKey: "owner",
          actionName: "signup",
          data: {
            quantity: "0.0000 ATD"
          },
          valid: true,
          balance: ""
        },

        {
          symbol: "POOR",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_poormantoken_POOR.png",
          description:
            "A reward for people who STAKE and VOTE for EOS Block Producers with MONTHLY drops.",
          keywords: "",
          website: "https://eostoolkit.io/airgrab",
          contract: "poormantoken",
          claimKey: "owner",
          actionName: "signup",
          data: {
            quantity: "0.0000 POOR"
          },
          valid: true,
          balance: ""
        },
        {
          symbol: "BRM",
          logo:
            "https://gz.bcebos.com/v1/tokenpocket/token-logo/EOS_openbrmeos11_BRM.png",
          description:
            "Very First Open source Billing and Revenue Management on Blockchain. OpenBRM is a carrier-grade billing platform aimed at telecommunications, Subscription, Utilities and logistics organizations.",
          website: "https://openbrm.io/",
          keywords: "1 BRM：1 EOS, " + this.$t("i18nView.brmSnapshot"),
          contract: "openbrmeos11",
          claimKey: "owner",
          actionName: "open",
          data: {
            symbol: "3,BRM"
          },
          valid: true,
          balance: ""
        },
        {
          symbol: "HVT",
          logo: "https://gz.bcebos.com/v1/tokenpocket/token-logo/EOS_HVT.PNG",
          description: this.$t("i18nView.hvtInfo"),
          website: "https://www.hirevibes.io/",
          keywords:
            this.$t("i18nView.finished") +
            "," +
            "1 HVT：4 EOS, " +
            this.$t("i18nView.hvtSnapshot"),
          contract: "hirevibeshvt",
          claimKey: "owner",
          actionName: "claim",
          data: {
            sym: "4,HVT"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "NEB",
          logo:
            "https://gz.bcebos.com/v1/tokenpocket/token-logo/EOS_nebulatokenn_ENB.png",
          description:
            "Nebula is a decentralized, curated list of professionals and job opportunities.",
          website: "https://nebulaprotocol.com",
          keywords:
            this.$t("i18nView.finished") +
            "," +
            "1000 NEB, " +
            this.$t("i18nView.nebSnapshot"),
          contract: "nebulatokenn",
          claimKey: "owner",
          actionName: "open",
          data: {
            symbol: "4,NEB"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "WIZZ",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_wizznetwork1_WIZZ.png",
          description:
            "Modern Decentralized Ecosystem, Built on EOSIO. Tools, Rewards, Chat, and more. AIGRAB NOW!",
          website: "https://wizz.network/",
          contract: "wizznetwork1",
          claimKey: "owner",
          actionName: "signup",
          keywords: this.$t("i18nView.finished"),
          data: {
            quantity: "0.0000 WIZZ"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "XBL",
          logo:
            "https://tp-statics.cdn.bcebos.com/token/1551273080111-XBLtoken.png",
          description:
            "The Billionaire Token - the first super-deflationary, gaming and gambling token. The Airgrab will end on the 12th of March 2019! Everyone who had more than 100 EOS in their wallets on the 20th of January 2019 is eligible to Airgrab XBL. The ratio is 0.00122 to 1 - this means that for every 1000 EOS, you will receive 1.22 XBL.",
          website: "https://billionairetoken.com",
          keywords:
            this.$t("i18nView.finished") +
            "," +
            this.$t("i18nView.xblSnapshot"),
          contract: "billionairet",
          claimKey: "owner",
          actionName: "open",
          data: {
            symbol: "4,XBL"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "DEOS",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_thedeosgames_DEOS.png",
          description:
            "Play zero house edge, provably fair and truly decentralized games. All EOS Token holders can get their DEOS tokens by 1:1 rate",
          website: "https://deosgames.com/",
          keywords:
            this.$t("i18nView.finished") +
            "," +
            this.$t("i18nView.genesis") +
            "," +
            this.$t("i18nView.deosSnapshot"),
          contract: "thedeosgames",
          claimKey: "owner",
          actionName: "claim",
          data: {
            quantity: "0.0000 DEOS"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "SLAM",
          logo:
            "https://gz.bcebos.com/v1/tokenpocket/token-logo/EOS_slamdevelops_SLAM.png",
          description:
            "SLAM games is a gambling platform powered by the EOS blockchain. The SLAM gaming center is a space where you can play interactive games with a clean, modern UI, which is easy to use to enhance your gaming experience.",
          website: "https://www.slamgames.io/",
          keywords: this.$t("i18nView.finished"),
          contract: "slamdevelops",
          claimKey: "owner",
          actionName: "signup",
          data: {
            quantity: "0.00000000 SLAM"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "INF",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_infinicoinio_INF.png",
          description:
            "Infiniverse is a decentralized augmented reality platform and virtual world on top of the real world. Infinicoin lets you register land and transact on the Infiniverse marketplace.",
          website: "https://www.infiniverse.net/",
          keywords: this.$t("i18nView.finished"),
          contract: "infinicoinio",
          claimKey: "owner",
          actionName: "open",
          data: {
            symbol: "4,INF"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "SEED",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_parslseed123_seed.jpg",
          description:
            "Parsl is a supply chain technology company. People within the cannabis industry, who pay subscription fees to use the Parsl platform need to do so using SEED tokens. SEED token holders are entitled to rewards under the terms that are specified in documents on the Parsl website.",
          website: "https://www.parsl.co",
          keywords:
            this.$t("i18nView.seedIntro") + "," + this.$t("i18nView.finished"),
          contract: "parslseed123",
          claimKey: "owner",
          actionName: "signup",
          data: {
            sym: "4,SEED"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "IGC",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_eosindiegame_IGC.png",
          description: this.$t("i18nView.igcIntro"),
          website: "https://github.com/EOSIndieGame/EOS-IndieGame",
          keywords: this.$t("i18nView.finished"),
          contract: "eosindiegame",
          claimKey: "actor",
          actionName: "claim",
          data: {
            token: "100.0000 IGC"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "DICE",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_betdicetoken_DICE.png",
          description:
            "Trustworthy, cost-free and pair EOS dice betting platform. Sign up for 1000 DICE",
          website: "https://betdice.one/",
          keywords: this.$t("i18nView.finished"),
          contract: "betdicetoken",
          claimKey: "owner",
          actionName: "signup",
          data: {
            quantity: "1000.0000 DICE"
          },
          valid: false,
          balance: ""
        },
        {
          symbol: "RIDL",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_ridlridlcoin_RIDL.png",
          description:
            "Support Scatter and trustless reputation on blockchain.",
          keywords: this.$t("i18nView.finished"),
          website: "https://ridl.get-scatter.com",
          contract: "ridlridlcoin",
          claimKey: "claimer",
          actionName: "claim",
          data: {},
          valid: false,
          balance: ""
        },
        {
          symbol: "TRYBE",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_trybenetwork_TRYBE.png",
          description:
            "A tokenized knowledge and content sharing platform. Airgrab now for 50 TRYBE tokens (dropped 11th September). Sign up to the platform for a bonus 100 tokens.",
          keywords: this.$t("i18nView.finished"),
          website: "https://trybe.one",
          contract: "trybenetwork",
          claimKey: "claimer",
          actionName: "claim",
          data: {},
          valid: false,
          balance: ""
        },
        {
          symbol: "SEVEN",
          logo:
            "https://dapp.mytokenpocket.vip/token-logo/EOS_xxxsevensxxx_SEVEN.png",
          description:
            "Sign Up and use your RAM (0.22kb) for receiving 10,000 SEVEN Tokens",
          website: "https://www.se7ens.io/",
          keywords: this.$t("i18nView.finished"),
          contract: "xxxsevensxxx",
          claimKey: "owner",
          actionName: "signup",
          data: {
            quantity: "10000.0000 SEVEN"
          },
          valid: false,
          balance: ""
        }
      ]
    };
  },

  computed: {},

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
    grab(index, type) {
      let grabInfo = this.grabList[index];
      if (type === "claim") {
        grabInfo = this.claimList[index];
      }

      let extendsData = {};
      extendsData[grabInfo.claimKey] = this.currentAccount;

      if (
        grabInfo.symbol === "INF" ||
        grabInfo.symbol === "NEB" ||
        grabInfo.symbol === "BRM" ||
        grabInfo.symbol === "BETFTY" ||
        grabInfo.symbol === "XBL"
      ) {
        extendsData["ram_payer"] = this.currentAccount;
      }

      tp.pushEosAction({
        actions: [
          {
            account: grabInfo.contract,
            name: grabInfo.actionName,
            authorization: [
              {
                actor: this.currentAccount,
                permission: "active"
              }
            ],
            data: _.assignIn(grabInfo.data, extendsData)
          }
        ],
        account: this.currentAccount,
        address: this.currentAddress
      }).then(res => {
        if (res.result) {
          Dialog.init(this.$t("i18nView.successTip"));
          this.getUserInfo();
        } else {
          Dialog.init(this.$t("i18nView.failTip"));
          this.getUserInfo();
        }
      });
    },

    getUserInfo() {
      let grabList = this.grabList;
      _.forEach(grabList, item => {
        // HVT 特殊处理
        if (item.symbol === "HVT") {
          tp.getTableRows({
            code: item.contract,
            json: true,
            scope: this.currentAccount,
            table: "accounts"
          }).then(res => {
            if (res.result && res.data.rows.length) {
              item.valid = !res.data.rows[0].claimed;
              item.balance = res.data.rows[0].balance;
            }
          });
        } else {
          let params = {
            account: this.currentAccount,
            contract: item.contract,
            symbol: item.symbol
          };
          tp.getEosBalance(params).then(res => {
            if (res.result) {
              if (res.data.balance && res.data.balance.length) {
                item.valid = false;
                item.balance = res.data.balance[0];
              }
            }
          });
        }
      });

      this.grabList = grabList;

      let claimList = this.claimList;
      _.forEach(claimList, item => {
        let params = {
          code: item.contract,
          json: true,
          scope: this.currentAccount,
          table: "accounts"
        };
        tp.getEosTableRows(params).then(res => {
          if (res.result) {
            if (res.data.rows && res.data.rows.length) {
              item.balance = res.data.rows[0].balance;
              if (item.symbol === "ZOS") {
                if (res.data.rows[0].claimed === 1) {
                  item.canClaim = true;
                  item.claimed = false;
                } else {
                  item.canClaim = false;
                  item.claimed = true;
                }
              } else {
                if (res.data.rows[0].claimed === 0) {
                  item.canClaim = true;
                  item.claimed = false;
                } else {
                  item.canClaim = false;
                  item.claimed = true;
                }
              }
            } else {
              item.canClaim = false;
            }
          }
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.intro {
  font-size: 12px;
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
  width: 38px;
  height: 38px;
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
  vertical-align: middle;
  line-height: 2;
}

.current-account {
  font-size: 13px;
  color: #333;
}

h3 {
  margin: 20px 10px 5px;
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
.desc {
  margin-bottom: 5px;
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
  position: relative;
  line-height: 30px;
  margin: 0 0 4px;
}

.balance {
  position: absolute;
  display: inline-block;
  right: 0px;
  top: -2px;
  z-index: 999;
}
</style>
