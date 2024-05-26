import { Module } from '../../class/Module';
import { Settings } from '../../class/Settings';
import { DOM } from '../../class/DOM';

class DiscussionsActiveDiscussionsToDisplay extends Module {
	constructor() {
		super();
		this.info = {
			description: () => (
				<ul>
					<li>
						Allows you to customize the number of active discussions displayed.
					</li>
				</ul>
			),
			inputItems: [
				{
					id: 'activeDiscussions_displayed',
					prefix: 'Number of active discussions to display ',
					suffix: '( More than 7 will require an additional page request. )',
					attributes: {
						type: 'number',
						min: '1',
						step: '1',
					},
				},
			],
			id: 'adtd',
			name: 'Active Discussions To Display',
			sg: true,
			sgPaths: /^Discussion|Giveaway|Browse\sGiveaways/,
			type: 'discussions',
		};
	}

	init() {
		if (!(this.esgst.giveawaysPath || this.esgst.discussionPath || this.esgst.giveawayPath || this.esgst.activeDiscussions) || (Settings.get('oadd') || Settings.get('adots'))) {
			return;
		}
		this.adtd_remove();
	}

	adtd_remove() {
		if (this.esgst.activeDiscussions) {
			const activeDiscussions = this.esgst.activeDiscussions;
			const activeDiscussionsDisplayed = Settings.get('activeDiscussions_displayed');
			const adotsIndex = Settings.get('adots_index');
			const leftSide = activeDiscussions.firstElementChild.querySelector('.table');
			const rightSide = activeDiscussions.lastElementChild.querySelector('.table');
			const leftSideChildren = Array.from(leftSide.firstElementChild.children);
			const rightSideChildren = Array.from(rightSide.firstElementChild.children);
			const discussionsToRemove = Math.max(leftSideChildren.length, rightSideChildren.length) - activeDiscussionsDisplayed;

			for (let i = 0; i < discussionsToRemove; i++) {
				leftSideChildren[leftSideChildren.length - 1 - i].remove();
				rightSideChildren[rightSideChildren.length - 1 - i].remove();
			}

			const leftSideHeight = leftSide.getBoundingClientRect().height;
			const rightSideHeight = rightSide.getBoundingClientRect().height;
			const adjustment = adotsIndex === 0 ? 0 : activeDiscussionsDisplayed * 14;

			leftSide.style.minHeight = `${leftSideHeight - adjustment}px`;
			rightSide.style.minHeight = `${rightSideHeight - adjustment}px`;
		}
	}
}

const discussionsActiveDiscussionsToDisplay = new DiscussionsActiveDiscussionsToDisplay();

export { discussionsActiveDiscussionsToDisplay };
