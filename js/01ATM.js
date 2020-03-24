/**
 * 1. ATM程序有主界面
 * 2. ATM程序有菜单界面，1、取钱2、存钱、3、查询余额4、转账
 * 3.用户，用户有登录成功，登录的时候，一般会设置三次机会
 * 使用函数来设计ATM程序
 */
var prompt = require('prompt-sync')()
var users = [
    ['Emma', '123321', 2000],
    ['Kate', '999888', 1500],
    ['Alen', '666555', 1000]
]

function init() {
    welcome()
    var index = login()
    if (index >= 0) {
        while (true) {
            mainMenu(index)
        }
    } else {
        console.info('用户名或者密码错误')
    }
}



function welcome() {
    console.log("=============欢迎使用woniu ATM=============" + '\n' + '============================================')
}

function login() {
    console.log("===========请输入用户名和密码登录===========")
    var count = 3
    do {
        console.info("您还有" + count + "次机会登录")
        var userName = prompt('请输入用户名：')
        var pwd = prompt('请输入密码：')
        for (const key in users) {
            if (userName == users[key][0] && pwd == users[key][1]) {
                return key
            }

        }
        count--
    } while (count > 0)
}



function mainMenu(index) {
    console.info("===============欢迎来到主菜单==============")
    console.info("=====1、取钱2、存钱、3、查询余额4、转账=====")
    var num = prompt("请选择您需要办理的业务:")
    switch (parseInt(num)) {
        case 1:
            reduceMoney(index);
            break;
        case 2:
            saveMoney(index);
            break;
        case 3:
            queryMoney(index);
            break;
        case 4:
            transfer(index);
            break;
        default:
            console.info("请输入正确的指令")

    }


}

function reduceMoney(index) {
    while (true) {
        var money = prompt('请正确输入您的取钱金额：')
        if (money <= 0 || money % 100 != 0 || money > 10000) {
            console.log('您的金额不满足要求')
        } else if (money > users[index][2]) {
            console.log('您的余额不足')
        } else {
            users[index][2] -= parseInt(money)
            break
        }
    }
}

function saveMoney(index) {
    while (true) {
        var money = prompt('请正确输入您的存钱金额：')
        if (money <= 0 || money % 100 != 0 || money > 10000) {
            console.log('您的金额不满足要求')
        } else {
            users[index][2] += parseInt(money)
            break
        }
    }

}

function queryMoney(index) {
    console.info(users[index][0] + "您好，您的余额为：" + users[index][2])
}

function transfer(index) {
    var boo

    var userName = prompt('请输入转账的用户名：')
    if (userName == users[index][0]) {
        console.info("不可以转账给自己")
    } else {
        for (const key in users) {
            if (userName == users[key][0]) {

                while (true) {
                    var money = prompt('请输入转账金额：')
                    if (money <= 0 || money % 100 != 0 || money > 10000) {
                        console.log('您的金额不满足要求')
                    } else if (money > users[index][2]) {
                        console.log('您的余额不足')
                    } else {
                        users[index][2] -= parseInt(money)
                        users[key][2] += parseInt(money);
                        boo = true
                        break;
                    }
                }


            } else {
                boo = false
            }

        }
        if (boo == false) {
            console.info("用户不存在！")
        }

    }





}






init()