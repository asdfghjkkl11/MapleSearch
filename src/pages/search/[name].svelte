<style>
    .main{
        width: 100%;
        min-width: 340px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        color: rgb(201, 206, 220);
        box-sizing: border-box;
    }
    .info{
        display: flex;
        align-items: start;
        gap: 8px;
    }
    .character{
        display: grid;
        grid-template-columns: 1fr 1fr;
        flex-direction: column;
        font-size: 14px;
    }
    .character > div{
        min-width: 140px;
        padding: 4px 8px;
        box-shadow: 1px 1px 0 0 rgba(255, 255, 255, 0.1),inset 1px 1px 0 0 rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
    }
    .items{
        display: grid;
        grid-auto-flow: column;
        grid-template-rows: repeat(13, 1fr);
    }
    .items.cash{
        grid-template-rows: repeat(10, 1fr);
    }
    .grid-col-2{
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: span 2 / auto;
    }
    .ability{
        grid-column: span 2 / auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .character-img-wrapper{
        width: 120px;
        height: 120px;
        position: relative;
        overflow: hidden;
    }
    .character-img{
        width: 240px;
        height: 240px;
        position: absolute;
        top: -80px;
        left: -50px;
    }
    .item{
        min-width: 360px;
        padding: 8px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px;
        font-size: 14px;
        box-shadow: inset 0 -1px 0 0 rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
    }
    .item.cash{
        min-width: 300px;
    }
    .item > div{
        flex-shrink: 0;
    }
    .item-img-wrapper{
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item-img{
        max-width: 32px;
    }
    .item-main-cube, .item-additional-cube{
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
    }
    .item-name{
        height: 32px;
        display: flex;
        align-items: center;
        flex: 1;
        cursor: pointer;
    }
    .cash .item-name{
        flex: none;
        min-width: 120px;
    }
    .item-cls{
        min-width: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
    }
    .cube{
        min-width: 80px;
    }
    .blue{
        color: #81c3d7;
    }
    .purple{
        color: #7b53e2;
    }
    .yellow{
        color: #e4ce00;
    }
    .star{
        color: #e4ce00;
    }
    .green{
        color: rgba(0,255,163,.9)
    }
    .option1{
        color: #9cc202;
    }
    .option2{
        color: #4fcaca
    }
    .btn-area{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
    }
    .btn{
        min-width: 24px;
        height: 24px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #292c35cc;
        border: 1px solid #cdcdcd;
        color: #ffffff;
        cursor: pointer;
    }
    .btn.text{
        padding: 0 4px;
    }
    .btn-close{
        width: 32px;
        height: 32px;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        background: none;
    }
    .reload-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/refresh.svg') no-repeat;
        background-size: contain;
    }
    .item-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/item.svg') no-repeat;
        background-size: contain;
    }
    .menu-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/menu.svg') no-repeat;
        background-size: contain;
    }
    .setting-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/img_setting.svg') no-repeat;
        background-size: contain;
    }
    .close-icon{
        width: 18px;
        height: 18px;
        display: inline-block;
        background: url('/image/img_x.svg') no-repeat;
        background-size: contain;
    }
    .simple-items{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }
    .simple-items .item{
        width: 60px !important;
        height: 60px;
        min-width: auto;
        justify-content: center;
        box-shadow: 1px 1px 0 0 rgba(255, 255, 255, 0.1), inset 1px 1px 0 0 rgba(255, 255, 255, 0.1);
        cursor: pointer;
    }
    .simple-items .empty{
        box-shadow: 1px 1px 0 0 rgba(255, 255, 255, 0.1), inset 1px 1px 0 0 rgba(255, 255, 255, 0.1);
    }
    .item-list{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item-modal{
        width: 100vw;
        height: 100vh;
        padding: 64px;
        display: none;
        justify-content: center;
        position: fixed;
        right: 0;
        top: 0;
        background: #292c35aa;
        box-sizing: border-box;
    }
    .is-show{
        display: flex;
    }
    .modal-content{
        padding: 8px;
        height: fit-content;
        min-width: 360px;
        min-height: 460px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #24272b;
        border-radius: 8px;
        opacity: 1;
        color: rgb(201, 206, 220);
    }
    .modal-header{
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 500;
    }
    .modal-header span{
        padding-left: 8px;
    }
    .modal-body{
        padding: 0 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .item-modal .item-img-wrapper{
        width: 80px;
        height: 80px;
        background: #cdcdcd;
    }
    .item-modal .item-img{
        min-width: 64px;
    }
    .stat{
        display: flex;
        flex-direction: column;
    }
    .divider{
        height: 8px;
    }
    .modal-footer{
        padding: 8px;
    }
    .item-main-info{
        display: flex;
        gap: 8px;
    }
    .item-info{
        display: flex;
        flex-direction: column;
    }
    .link{
        font-size: 16px;
        color: #81c3d7;
    }
    .error{
        font-size: 24px;
    }
    .input-text{
        width: 28px;
        text-align: right;
        padding: 4px 8px;
        border: none;
        border-radius: 8px;
        background: #2e3033;
        color: #dfe2ea;
    }
    .input-text:focus{
        outline: none;
    }
    .setting-row{
        padding-right: 24px;
    }
    @media (max-width: 1630px) {
        .item {
            width: 360px;
            justify-content: center;
        }
        .item.cash {
            width: 300px;
        }
    }
    @media (max-width: 1024px) {
        .info {
            flex-direction: column;
            align-items: center;
        }
    }
    @media (max-width: 720px) {
        .items{
            grid-auto-flow: row;
            grid-template-columns: 1fr;
            grid-template-rows: none;
        }
    }
</style>
<div class="main">
    <Searchbar/>
    <div class="info">
        {#await data}
            <p>...Loading</p>
        {:then data}
            <div class="character">
                {#if character}
                    {#if character["name"] !== ""}
                        <div class="grid-col-2">
                            <div class="character-img-wrapper">
                                <img class="character-img" src="{character['image']}">
                            </div>
                        </div>
                        <div>{character["level"]}</div>
                        <div>{character["name"]}</div>
                        {#if character["월드"]}
                            <div>{character["월드"]}</div>
                            <div>{character["직업"]}</div>
                            <div>스탯공격력</div>
                            <div>{character["스탯공격력"][1]}</div>
                            <div>HP</div>
                            <div>{character["HP"]}</div>
                            <div>STR</div>
                            <div>{character["STR"]}</div>
                            <div>DEX</div>
                            <div>{character["DEX"]}</div>
                            <div>INT</div>
                            <div>{character["INT"]}</div>
                            <div>LUK</div>
                            <div>{character["LUK"]}</div>
                            <div>보스공격력</div>
                            <div>{character["보스공격력"]}</div>
                            <div>방어율무시</div>
                            <div>{character["방어율무시"]}</div>
                            <div>크리티컬 데미지</div>
                            <div>{character["크리티컬 데미지"]}</div>
                            <div class="ability">
                                <span class='{gradeMapper[character["어빌리티"]["grade"]]}'>{character["어빌리티"]["grade"]} 어빌리티</span>
                                <span>{character["어빌리티"]["value"][0]}</span>
                                <span>{character["어빌리티"]["value"][1]}</span>
                                <span>{character["어빌리티"]["value"][2]}</span>
                            </div>
                        {:else}
                            <div style="grid-column: span 2 / auto;">
                                <span>메이플 공식홈페이지 - 마이메이플 - 캐릭터정보 공개설정에서<br>공개설정을해야 조회됩니다.</span>
                            </div>
                            <div style="grid-column: span 2 / auto;">
                                <a class="link" href="https://maplestory.nexon.com/MyMaple/Account/Character/Visibility" target="_blank">홈페이지 이동</a>
                            </div>
                        {/if}
                    {/if}
                {/if}
            </div>
            <div class="item-list">
                <div class="btn-area">
                    <button class="btn" on:click={refresh}>
                        <i class="reload-icon"></i>
                    </button>
                    <button class="btn text" on:click={changeItemType}>
                        <span>{(itemType===1)?'캐시아이템 보기':'장비아이템 보기'}</span>
                        <i class=""></i>
                    </button>
                    <button class="btn" on:click={changeDisplayMode}>
                        <i class="{(itemOrderMode===1)?'item-icon':'menu-icon'}"></i>
                    </button>
                    <button class="btn" on:click={settingOpen}>
                        <i class="setting-icon"></i>
                    </button>
                </div>
                {#if itemType === 1}
                    {#if items.length > 0}
                        {#if itemOrderMode === 1}
                            <div class="items">
                                {#each items as item, i}
                                    <div class="item" style="order: {itemOrder1[i]}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{item['image']}">
                                        </div>
                                        <div class="item-name" on:click={clickItem(item)}>
                                            <span>
                                                {#if nvl(item.starforce) !== ""}
                                                    <span class="star">★{item.starforce.replace("성 강화","")}</span>
                                                {/if}
                                                <span>{item["name"]}{(item["seed"] !== "")?` ${item["seed"]}레벨`:""}</span>
                                            </span>
                                        </div>
                                        <div class="item-cls">
                                            <span>{calculate_option(item,main,character["직업"],atkStatMulti,atkStatMultiXenon)}</span>
                                        </div>
                                        <div class="item-cube">
                                            {#if item["잠재옵션"]}
                                                {#if item["잠재옵션"]["grade"] !== ""}
                                                    <div class="item-main-cube">
                                                        <div class='{gradeMapper[item["잠재옵션"]["grade"]]}'>잠재</div>
                                                        {#each item["잠재옵션"]["option"] as option, j}
                                                            <div class='cube {gradeMapper[item["잠재옵션"]["grade"]]}'>{nvl(option[0])}{(nvl(option[1])!=="")?": " + nvl(option[1]):""}</div>
                                                        {/each}
                                                    </div>
                                                {/if}
                                            {/if}
                                            {#if item["에디셔널 잠재옵션"]}
                                                {#if item["에디셔널 잠재옵션"]["grade"] !== ""}
                                                    <div class="item-additional-cube">
                                                        <div class='{gradeMapper[item["에디셔널 잠재옵션"]["grade"]]}'>에디</div>
                                                        {#each item["에디셔널 잠재옵션"]["option"] as option, j}
                                                            <div class='cube {gradeMapper[item["에디셔널 잠재옵션"]["grade"]]}'>{nvl(option[0])}{(nvl(option[1])!=="")?": " + nvl(option[1]):""}</div>
                                                        {/each}
                                                    </div>
                                                {/if}
                                            {/if}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <div class="simple-items">
                                {#each items as item, i}
                                    <div class="item" style="order: {itemOrder2[i]}">
                                        <div class="item-img-wrapper" on:click={clickItem(item)}>
                                            <img class="item-img" src="{item['image']}">
                                        </div>
                                    </div>
                                {/each}
                                <div class="empty" style="order: 2"></div>
                                <div class="empty" style="order: 4"></div>
                                <div class="empty" style="order: 9"></div>
                                <div class="empty" style="order: 25"></div>
                                <div class="empty" style="order: 26"></div>
                            </div>
                        {/if}
                    {/if}
                {:else}
                    {#if cashItems.length > 0}
                        {#if itemOrderMode === 1}
                            <div class="items cash">
                                {#each cashItems as item, i}
                                    <div class="item cash" style="order: {cashItemOrder1[i]}">
                                        <div class="item-img-wrapper">
                                            <img class="item-img" src="{item['image']}">
                                        </div>
                                        <div class="item-name" on:click={clickItem(item)}>
                                            <span>
                                                <span>{item["name"]}</span>
                                            </span>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        {:else}
                            <div class="simple-items">
                                {#each cashItems as item, i}
                                    <div class="item cash" style="order: {cashItemOrder2[i]}">
                                        <div class="item-img-wrapper" on:click={clickItem(item)}>
                                            <img class="item-img" src="{item['image']}">
                                        </div>
                                    </div>
                                {/each}
                                <div class="empty" style="order: 2"></div>
                                <div class="empty" style="order: 4"></div>
                                <div class="empty" style="order: 7"></div>
                                <div class="empty" style="order: 9"></div>
                                <div class="empty" style="order: 12"></div>
                                <div class="empty" style="order: 15"></div>
                                <div class="empty" style="order: 19"></div>
                                <div class="empty" style="order: 21"></div>
                                <div class="empty" style="order: 22"></div>
                                <div class="empty" style="order: 25"></div>
                                <div class="empty" style="order: 26"></div>
                                <div class="empty" style="order: 29"></div>
                                <div class="empty" style="order: 30"></div>
                            </div>
                        {/if}
                    {/if}
                {/if}
            </div>
        {:catch error}
            <p class="error">오류가 발생했습니다.</p>
        {/await}
    </div>
</div>
<div class="item-modal" class:is-show={isModalOpen}>
    <div class="modal-content">
        <div class="modal-header">
            <span>
                {#if nvl(selectedItem?.starforce) !== ""}
                    <span class="star">★{selectedItem?.starforce?.replace("성 강화","")}</span>
                {/if}
                <span>{selectedItem["name"]}{(selectedItem["seed"] !== "")?` ${selectedItem["seed"]}레벨`:""}</span>
            </span>
            <button class="btn-close" on:click={modalClose}>
                <i class="close-icon"></i>
            </button>
        </div>
        <div class="modal-body">
            <div class="item-main-info">
                <div class="item-img-wrapper">
                    <img class="item-img" src="{selectedItem['image']}">
                </div>
                <div class="item-info">
                    {#if (selectedItem["soul"])}
                        <span>{selectedItem["soul"]}</span>
                    {/if}
                    <span>{selectedItem["name"]}{(selectedItem["seed"] !== "")?` ${selectedItem["seed"]}레벨`:""}</span>
                    <span>{selectedItem["starforce"]}</span>
                    <span>level: {selectedItem["level"]}</span>
                </div>
            </div>
            <div class="stat">
                {#each itemOptionOrder1 as option,i}
                    {#if (selectedItem[option])}
                        <div>
                            <span>{option} : {selectedItem[option][0]}
                                {#if (selectedItem[option].length > 1)}
                                    ({selectedItem[option][1]}
                                    {#if (selectedItem[option].length > 2)}
                                        <span class="option1">+{selectedItem[option][2]}</span>
                                    {/if}
                                    {#if (selectedItem[option].length > 3)}
                                        <span class="option2">+{selectedItem[option][3]}</span>
                                    {/if}
                                    )
                                {/if}
                            </span>
                        </div>
                    {/if}
                {/each}
                {#each itemOptionOrder2 as option,i}
                    {#if (selectedItem[option])}
                        <div>
                            <span>{option} : {selectedItem[option]}</span>
                        </div>
                    {/if}
                {/each}
                {#if selectedItem["잠재옵션"]}
                    {#if selectedItem["잠재옵션"]["grade"] !== ""}
                        <div class="divider"></div>
                        <div>
                            <div class='{gradeMapper[selectedItem["잠재옵션"]["grade"]]}'>잠재옵션</div>
                            {#each selectedItem["잠재옵션"]["option"] as option, j}
                                <div class='cube'>{nvl(option[0])}{(nvl(option[1])!=="")?": " + nvl(option[1]):""}</div>
                            {/each}
                        </div>
                    {/if}
                {/if}
                {#if selectedItem["에디셔널 잠재옵션"]}
                    {#if selectedItem["에디셔널 잠재옵션"]["grade"] !== ""}
                        <div class="divider"></div>
                        <div>
                            <div class='{gradeMapper[selectedItem["에디셔널 잠재옵션"]["grade"]]}'>에디셔널 잠재옵션</div>
                            {#each selectedItem["에디셔널 잠재옵션"]["option"] as option, j}
                                <div class='cube'>{nvl(option[0])}{(nvl(option[1])!=="")?": " + nvl(option[1]):""}</div>
                            {/each}
                        </div>
                    {/if}
                {/if}
                {#if selectedItem["소울옵션"]}
                    <div class="divider"></div>
                    {#each selectedItem["소울옵션"] as option,j}
                        <div>
                            <span>{option}</span>
                        </div>
                    {/each}
                {/if}
                {#if selectedItem["기타"]}
                    <div class="divider"></div>
                    {#each selectedItem["기타"] as option,j}
                        <div>
                            <span>{option}</span>
                        </div>
                    {/each}
                {/if}
            </div>
        </div>
        <div class="modal-footer">
        </div>
    </div>
</div>
<div class="item-modal" class:is-show={isSettingOpen}>
    <div class="modal-content">
        <div class="modal-header">
            <span>설정</span>
            <button class="btn-close" on:click={settingClose}>
                <i class="close-icon"></i>
            </button>
        </div>
        <div class="modal-body">
            <div class="setting-row">
                <ul>
                    <li>
                        <span>공/마 1당 <input type="text" class="input-text" bind:value={atkStatMulti}> 급 (최대 소수점 2자리까지)</span>
                    </li>
                    <li>
                        <span>제논: 공/마 1당 <input type="text" class="input-text" bind:value={atkStatMultiXenon}> 급 (최대 소수점 2자리까지)</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
<script>
    import {params,afterPageLoad} from "@roxi/routify";
    import {calculate_option, get_idb, input_float, nvl, option_parse, set_idb, uc} from "../../js/common";
    import Searchbar from "../../component/Searchbar.svelte";

    let name = decodeURIComponent($params.name);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let character = {};
    let items = [];
    let cashItems = [];
    let itemType = 1;
    let itemOrderMode = 1;
    let itemOrder1 = [20,4,1,19,16,12,22,18,15,11,14,23,17,2,5,7,3,21,13,6,8,9,10,24,25];
    let itemOrder2 = [16,3,5,11,12,8,10,6,7,13,14,15,1,16,17,18,19,20,21,22,23,24,27,28,29];
    let cashItemOrder1 = [17,3,7,16,11,8,15,12,13,14,1,4,2,5,9,10,6];
    let cashItemOrder2 = [16,3,5,11,8,10,6,13,14,1,17,18,20,23,24,25,28];
    let itemOptionOrder1 = ["STR","DEX","INT","LUK","MaxHP","MaxMP","공격력","마력","물리방어력","보스 몬스터공격 시 데미지","몬스터 방어력 무시","데미지","올스탯"];
    let itemOptionOrder2 = ["공격속도","가위 사용 가능 횟수"];
    let main = "STR";
    let gradeMapper = {
        "레어": "blue",
        "에픽": "purple",
        "유니크": "yellow",
        "레전드리": "green",
    }
    let selectedItem = {};
    let isModalOpen = false;
    let isSettingOpen = false;
    let atkStatMulti = nvl(localStorage.getItem("atkStatMulti"),4);
    let atkStatMultiXenon = nvl(localStorage.getItem("atkStatMultiXenon"),7);
    $: data = getData();

    $:{
        atkStatMulti = input_float(atkStatMulti,2);
        atkStatMultiXenon = input_float(atkStatMultiXenon,2);

        if(atkStatMulti != nvl(localStorage.getItem("atkStatMulti"),4)){
            localStorage.setItem("atkStatMulti",atkStatMulti);
        }
        if(atkStatMultiXenon != nvl(localStorage.getItem("atkStatMultiXenon"),7)){
            localStorage.setItem("atkStatMultiXenon",atkStatMultiXenon);
        }
    }
    $:{
        if(character){
            if(character.name !== ""){
                let str = uc(character["STR"]);
                let dex = uc(character["DEX"]);
                let int = uc(character["INT"]);
                let luk = uc(character["LUK"]);
                let max = Math.max(str,dex,int,luk);

                if(max == str){
                    main = "STR";
                }else if(max == dex){
                    main = "DEX";
                }else if(max == int){
                    main = "INT";
                }else if(max == luk){
                    main = "LUK";
                }
            }
        }

        if(items) {
            for (let i = 0; i < items.length; i++) {
                let a = items[i]["잠재옵션"];
                let b = items[i]["에디셔널 잠재옵션"];

                if (a) {
                    if (a["grade"] !== "") {
                        for (let j = 0; j < a["option"].length; j++) {
                            a["option"][j] = option_parse(a["option"][j]);
                        }
                    }
                }
                if (b) {
                    if (b["grade"] !== "") {
                        for (let j = 0; j < b["option"].length; j++) {
                            b["option"][j] = option_parse(b["option"][j]);
                        }
                    }
                }
            }
        }
    }

    async function getData(){
        let cache = await get_idb(name);
        if(cache){
            let time = new Date().getTime() - cache.time;
            if(time < 300000){
                character = cache.data.character;
                items = cache.data.items;
                cashItems = cache.data.cashItems;
                return "";
            }
        }
        return getDataFromServer();
    }

    $afterPageLoad(()=>{
        name = decodeURIComponent($params.name);
        data = getData();
    })

    async function getDataFromServer(){
        return fetch("https://mapleserver.asdfghjkkl11.com/maple/getCharacter",{
            "method": "POST",
            "body": JSON.stringify({
                "ID": name
            }),
            headers: myHeaders,
        }).then(async response => {
            let data = await response.json();
            if(data.resultCode === "success") {
                character = data.data.character;
                items = data.data.items;
                cashItems = data.data.cashItems;
                await set_idb(name,{
                    data: data.data,
                    time: new Date().getTime()
                });
            }else{
                throw new Error(data.error.message);
            }
        });
    }

    function refresh(){
        data = getDataFromServer();
    }

    function clickItem(item){
        console.log(item)
        selectedItem = item;
        modalOpen();
    }

    function modalOpen(){
        isModalOpen = true;
        let body = document.querySelector("body");
        body.style.overflow = "hidden";
    }

    function modalClose(){
        isModalOpen = false;
        let body = document.querySelector("body");
        body.style.overflow = "auto";
    }

    function changeItemType(){
        itemType ^= 1;
    }

    function changeDisplayMode(){
        itemOrderMode ^= 1;
    }
    function settingOpen(){
        isSettingOpen = true;
        let body = document.querySelector("body");
        body.style.overflow = "hidden";
    }
    function settingClose(){
        isSettingOpen = false;
        let body = document.querySelector("body");
        body.style.overflow = "auto";
    }
</script>
