# GoodHealthSystem
This is a web application for sports fans.

## 系统简介
本系统是一个社交化的在线运动健康管理平台，主要功能包括运动管理、活动管
理、用户管理、权限管理、统计分析和社交。

## 基本功能
### 注册
用户可以使用电子邮箱作为唯一标识进行注册
目录： /goodHealth/pages/login/login.html

### 登录
用户可以使用电子邮箱进行登录
目录： /goodHealth/pages/register/register.html

## 活动管理
### 所有运动查看
用户可以查看所有活动，并且报名感兴趣的活动
目录：goodHealth/pages/index.html
### 活动报名
### 查看已报名活动
用户可以查看自己已经参与的活动，并且可以从该活动中退出。点击右侧的“＋”
按钮，可以创建新的活动
目录：goodHealth/pages/activities/myActivities.html
### 退出活动
### 创建活动
用户填写创建的新活动的信息
## 运动管理
### 我的运动
用户可以查看自己的运动统计数据
目录：goodHealth/pages/healthManage/mySports.html
## 用户管理
### 账户设置
用户可以更新自己的基本信息和头像
目录： /goodHealth/pages/profile/profileReset.html
### 密码重置
用户可以重置密码
目录：http://localhost/goodHealth/pages/profile/passwordReset.html
### 好友管理
用户可以查看好友资料，或者删除已经添加的好友
目录：goodHealth/pages/social/myFriendsManage.html
## 权限管理
### 用户举报可疑活动
用户可以对可疑的活动进行举报并且填写举报原因
目录： /goodHealth/pages/index.html
### 管理员处理举报
可以确认处理举报，以更新举报状态（管理员登陆后导航发生改变）
目录： /goodHealth/pages/admin/admin.html
### 管理员进行用户管理
可以查看用户资料或者删除用户
目录：/goodHealth/pages/admin/userManage.html
### 管理员进行活动管理
管理员可以直接撤销审核后存在问题的活动
目录：/goodHealth/pages/admin/activityManage.html
## 统计分析
### 睡眠分析
系统会记录最近一次的用户睡眠情况，并且展现睡眠有效率
目录：goodHealth/pages/healthManage/mySleep.html
### 身体管理
系统将提供用户的BMI 指标，用户可以输入自己的身高体重，系统将会显示根
据新的身高体重计算出的BMI 指标，并且进行健康状况评估
目录：goodHealth/pages/healthManage/myBody.html
## 社交
### 我的圈子
用户可以查看拥有相同兴趣的所有用户，并可以查看资料或添加好友
目录：/goodHealth/pages/social/myCircle.html
