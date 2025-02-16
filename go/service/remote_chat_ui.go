package service

import (
	"golang.org/x/net/context"

	"github.com/keybase/client/go/protocol/chat1"
	"github.com/keybase/go-framed-msgpack-rpc/rpc"
)

type RemoteChatUI struct {
	sessionID int
	cli       chat1.ChatUiClient
}

func NewRemoteChatUI(sessionID int, c *rpc.Client) *RemoteChatUI {
	return &RemoteChatUI{
		sessionID: sessionID,
		cli:       chat1.ChatUiClient{Cli: c},
	}
}

func (r *RemoteChatUI) ChatAttachmentDownloadStart(ctx context.Context) error {
	return r.cli.ChatAttachmentDownloadStart(ctx, r.sessionID)
}

func (r *RemoteChatUI) ChatAttachmentDownloadProgress(ctx context.Context, arg chat1.ChatAttachmentDownloadProgressArg) error {
	arg.SessionID = r.sessionID
	return r.cli.ChatAttachmentDownloadProgress(ctx, arg)
}

func (r *RemoteChatUI) ChatAttachmentDownloadDone(ctx context.Context) error {
	return r.cli.ChatAttachmentDownloadDone(ctx, r.sessionID)
}

func (r *RemoteChatUI) ChatInboxConversation(ctx context.Context, arg chat1.ChatInboxConversationArg) error {
	return r.cli.ChatInboxConversation(ctx, arg)
}

func (r *RemoteChatUI) ChatInboxFailed(ctx context.Context, arg chat1.ChatInboxFailedArg) error {
	return r.cli.ChatInboxFailed(ctx, arg)
}

func (r *RemoteChatUI) ChatInboxUnverified(ctx context.Context, arg chat1.ChatInboxUnverifiedArg) error {
	return r.cli.ChatInboxUnverified(ctx, arg)
}

func (r *RemoteChatUI) ChatThreadCached(ctx context.Context, arg chat1.ChatThreadCachedArg) error {
	return r.cli.ChatThreadCached(ctx, arg)
}

func (r *RemoteChatUI) ChatThreadFull(ctx context.Context, arg chat1.ChatThreadFullArg) error {
	return r.cli.ChatThreadFull(ctx, arg)
}

func (r *RemoteChatUI) ChatConfirmChannelDelete(ctx context.Context, arg chat1.ChatConfirmChannelDeleteArg) (bool, error) {
	return r.cli.ChatConfirmChannelDelete(ctx, arg)
}

func (r *RemoteChatUI) ChatSearchHit(ctx context.Context, arg chat1.ChatSearchHitArg) error {
	return r.cli.ChatSearchHit(ctx, arg)
}

func (r *RemoteChatUI) ChatSearchDone(ctx context.Context, arg chat1.ChatSearchDoneArg) error {
	return r.cli.ChatSearchDone(ctx, arg)
}

func (r *RemoteChatUI) ChatInboxSearchHit(ctx context.Context, arg chat1.ChatInboxSearchHitArg) error {
	return r.cli.ChatInboxSearchHit(ctx, arg)
}

func (r *RemoteChatUI) ChatInboxSearchDone(ctx context.Context, arg chat1.ChatInboxSearchDoneArg) error {
	return r.cli.ChatInboxSearchDone(ctx, arg)
}
