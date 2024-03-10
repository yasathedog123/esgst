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
					suffix: '(min 1 , max 7)',
					attributes: {
						type: 'number',
						min: '1',
						max: '7',
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
		if ((this.esgst.giveawaysPath || this.esgst.discussionPath || this.esgst.giveawayPath) && this.esgst.activeDiscussions && !(Settings.get('oadd') || Settings.get('adots'))) {
			this.adtd_remove();
		}
	}

	adtd_remove() {
		if (this.esgst.activeDiscussions) {
			let leftSide = this.esgst.activeDiscussions.firstElementChild.querySelector('.table');
			let rightSide = this.esgst.activeDiscussions.lastElementChild.querySelector('.table');
			while (leftSide.firstElementChild.children.length > Settings.get('activeDiscussions_displayed')) {
				leftSide.firstElementChild.lastChild.remove();
				rightSide.firstElementChild.lastChild.remove();
			}
			let element = leftSide.getBoundingClientRect();
			leftSide.style.minHeight = `${element.height}px`;
			rightSide.style.minHeight = `${element.height}px`;
		}
	}
}

const discussionsActiveDiscussionsToDisplay = new DiscussionsActiveDiscussionsToDisplay();

export { discussionsActiveDiscussionsToDisplay };
