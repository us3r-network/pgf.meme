"use client";

import React, { useEffect } from "react";

const TELEGRAM_WIDGET_ENDPOINT =
  "https://telegram.org/js/telegram-widget.js?22";

const getTelegramScript = () => {
  const script = document.createElement("script");
  script.src = TELEGRAM_WIDGET_ENDPOINT;
  script.async = true;
  script.setAttribute("data-color", "FD1E95");
  // script.setAttribute("data-dark-color", "FD1E95");
  // script.setAttribute("data-dark", "1");
  return script;
};

export const TelegramShareWidget = ({ url }: { url: string }) => {
  useEffect(() => {
    const script = getTelegramScript();
    script.setAttribute("data-telegram-share-url", url);
    const element = document.getElementById("telegram-widget-share-container");
    if (element?.childElementCount === 0) element?.appendChild(script);
  }, []);

  return <div id="telegram-widget-share-container"></div>;
};

export const TelegramLoginWidget = () => {
  useEffect(() => {
    const script = getTelegramScript();
    script.setAttribute("data-telegram-login", "samplebot");
    script.setAttribute("data-telegram-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    const element = document.getElementById("telegram-widget-login-container");
    if (element?.childElementCount === 0) element?.appendChild(script);
  }, []);
  const onTelegramAuth = (user: any) => {
    alert(
      "Logged in as " +
        user.first_name +
        " " +
        user.last_name +
        " (" +
        user.id +
        (user.username ? ", @" + user.username : "") +
        ")"
    );
  };
  return <div id="telegram-widget-login-container"></div>;
};

export const TelegramPostWidget = ({ post }: { post: string }) => {
  useEffect(() => {
    const script = getTelegramScript();
    script.setAttribute("data-telegram-post", post);
    script.setAttribute("data-userpic", "true");
    const element = document.getElementById("telegram-widget-post-container");
    if (element?.childElementCount === 0) element?.appendChild(script);
  }, []);
  return <div id="telegram-widget-post-container"></div>;
};

export const TelegramCommentsWidget = ({
  discussion,
  limit = 5,
}: {
  discussion: string;
  limit?: number;
}) => {
  useEffect(() => {
    const script = getTelegramScript();
    script.setAttribute("data-telegram-discussion", discussion);
    script.setAttribute("data-comments-limit", String(limit));
    const element = document.getElementById(
      "telegram-widget-comments-container"
    );
    if (element?.childElementCount === 0) element?.appendChild(script);
  }, []);
  return <div id="telegram-widget-comments-container"></div>;
};
