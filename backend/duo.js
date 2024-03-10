/*
fetch("https://www.duolingo.com/2017-06-30/users/1088815755?fields=acquisitionSurveyReason,adsConfig,animationEnabled,betaStatus,blockedUserIds,blockerUserIds,canUseModerationTools,classroomLeaderboardsEnabled,courses,creationDate,currentCourseId,email,emailAnnouncement,emailAssignment,emailAssignmentComplete,emailClassroomJoin,emailClassroomLeave,emailEditSuggested,emailEventsDigest,emailFollow,emailPass,emailPromotion,emailResearch,emailWeeklyProgressReport,emailSchoolsAnnouncement,emailSchoolsNewsletter,emailSchoolsProductUpdate,emailSchoolsPromotion,emailStreamPost,emailVerified,emailWeeklyReport,enableMicrophone,enableSoundEffects,enableSpeaker,experiments%7Bconnect_friends_quests_gifting_2,connect_web_migrate_to_feed_service,designsys_web_redesign_settings_page,gweb_avatar_builder,gweb_avatar_builder_v2,gweb_diamond_tournament_dogfooding,mcoach_family_weekly_report_dev,mcoach_web_ph_copysolidate,mcoach_web_words_list,mcoach_web_words_list_remove_promo,minfra_web_stripe_setup_intent,path_web_course_complete_slides,path_web_daily_refresh_animation,path_web_example_sentences,path_web_example_sentences_split,path_web_sections_overview,path_web_speaking_toggle_removal,spack_new_years_2024_dark_packages,spack_new_years_2024_discount_explain,spack_new_years_2024_fab_animation,spack_new_years_2024_last_chance,spack_new_years_2024_new_hooks,spack_new_years_2024_purchase_flow_port,spack_new_years_2024_show_family_plan,spack_web_copysolidate_conv,spack_web_copysolidate_dash_super,spack_web_copysolidate_quit,spack_web_hearts_new_users,spack_web_hearts_new_users_launch,spack_web_new_years_2024_vid_ad_load,spack_web_super_promo_d12_pf2,spack_web_upgrade_flow,use_new_hint_tokenization_ja_en_web_v2,web_hintable_text_rewrite_v3,web_shorter_midlesson,writing_web_pinyin_hanzi,writing_web_pronunciation_bingo%7D,facebookId,fromLanguage,gemsConfig,globalAmbassadorStatus,googleId,hasFacebookId,hasGoogleId,hasPlus,health,id,inviteURL,joinedClassroomIds,lastResurrectionTimestamp,lastStreak%7BisAvailableForRepair,length%7D,learningLanguage,lingots,location,monthlyXp,name,observedClassroomIds,optionalFeatures,persistentNotifications,picture,plusDiscounts,practiceReminderSettings,privacySettings,referralInfo,rewardBundles,roles,sessionCount,streak,streakData%7BcurrentStreak,longestStreak,previousStreak%7D,timezone,timezoneOffset,totalXp,trackingProperties,username,webNotificationIds,weeklyXp,xpGains,xpGoal,zhTw,currentCourse&_=1709683159011", {
    "headers": {
        "accept": "application/json; charset=UTF-8",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjYzMDcyMDAwMDAsImlhdCI6MCwic3ViIjoxMjU0MTQ2OTgxfQ.3uHNeNIvSSA5noj_bs9QtuoL1lnY6mjhqZYklpR4nwQ",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "Referer": "https://www.duolingo.com/?isLoggingIn=true",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
}).then(x => x.text()).then(y => {
    require("fs").writeFileSync("test.json", JSON.stringify(y));
});*/

fetch("https://www.duolingo.com/2017-06-30/friends/users/1088815755/following?pageSize=500&_=1709684102257", {
    "headers": {
        "accept": "application/json; charset=UTF-8",
        "accept-language": "en-US,en;q=0.9",
        "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjYzMDcyMDAwMDAsImlhdCI6MCwic3ViIjoxMjU0MTQ2OTgxfQ.3uHNeNIvSSA5noj_bs9QtuoL1lnY6mjhqZYklpR4nwQ",
        "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "Referer": "https://www.duolingo.com/profile/DayTrip5",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
}).then(x => x.text()).then(y => {
    require("fs").writeFileSync("oof.json", JSON.stringify(y, null, 4));
});
