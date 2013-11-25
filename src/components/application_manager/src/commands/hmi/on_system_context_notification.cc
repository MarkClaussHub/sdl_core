/**
 * Copyright (c) 2013, Ford Motor Company
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following
 * disclaimer in the documentation and/or other materials provided with the
 * distribution.
 *
 * Neither the name of the Ford Motor Company nor the names of its contributors
 * may be used to endorse or promote products derived from this software
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

#include "application_manager/commands/hmi/on_system_context_notification.h"
#include "application_manager/application_manager_impl.h"
#include "application_manager/application_impl.h"
#include "application_manager/message_helper.h"

namespace application_manager {

namespace {
using namespace mobile_api::AudioStreamingState;

void MuteAudioStream(const ApplicationManagerImpl* app_mgr,
                          Application* app) {
  if (app_mgr->attenuated_supported()) {
    app->set_audio_streaming_state(ATTENUATED);
  } else {
    app->set_audio_streaming_state(NOT_AUDIBLE);
  }
}

void UnmuteAudioStream(Application* app) {
  app->set_audio_streaming_state(AUDIBLE);
}

void UpdateVRState(ApplicationManagerImpl* app_mgr,
                   Application* app,
                   bool vr_session_is_active_on_hmi) {
  // If VR session state is now different (has changed) on HMI
  if (app_mgr->vr_session_started() != vr_session_is_active_on_hmi) {
    if (vr_session_is_active_on_hmi)
      MuteAudioStream(app_mgr, app);
    else
      UnmuteAudioStream(app);

    app_mgr->set_vr_session_started(vr_session_is_active_on_hmi);
  }
}

}

namespace commands {
using namespace mobile_api::SystemContext;

OnSystemContextNotification::OnSystemContextNotification(
    const MessageSharedPtr& message)
    : NotificationFromHMI(message) {
}

OnSystemContextNotification::~OnSystemContextNotification() {
}

void OnSystemContextNotification::Run() {
  LOG4CXX_INFO(logger_, "OnSystemContextNotification::Run");

  // Only currently active app will receive HMI context update
  Application* app = ApplicationManagerImpl::instance()->active_application();
  // If there is active application
  if (app) {
    ApplicationManagerImpl* app_mgr = ApplicationManagerImpl::instance();

    mobile_api::SystemContext::eType system_context =
        static_cast<mobile_api::SystemContext::eType>((*message_)[strings::msg_params][hmi_notification::system_context]
            .asInt());

    // If context actually changed
    if (system_context != app->system_context()) {
      app->set_system_context(system_context);
      if (app->is_media_application()) {
        UpdateVRState(app_mgr, app, SYSCTXT_VRSESSION == system_context);
      }
      NotifyMobileApp(app);
    }
  }
}

void OnSystemContextNotification::NotifyMobileApp(Application* const app) {
  MessageHelper::SendHMIStatusNotification(*app);
}

}  // namespace commands

}  // namespace application_manager
